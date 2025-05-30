package com.ruoyi.framework.aspectj;

import java.lang.reflect.Method;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ruoyi.common.annotation.RateLimiter;
import com.ruoyi.common.core.cache.MemoryCache;
import com.ruoyi.common.enums.LimitType;
import com.ruoyi.common.exception.ServiceException;
import com.ruoyi.common.utils.ServletUtils;
import com.ruoyi.common.utils.StringUtils;
import com.ruoyi.common.utils.ip.IpUtils;

/**
 * 限流处理
 *
 * @author ruoyi
 */
@Aspect
@Component
public class RateLimiterAspect
{
    private static final Logger log = LoggerFactory.getLogger(RateLimiterAspect.class);

    @Autowired
    private MemoryCache memoryCache;

    @Before("@annotation(rateLimiter)")
    public void doBefore(JoinPoint point, RateLimiter rateLimiter) throws Throwable
    {
        String key = rateLimiter.key();
        int time = rateLimiter.time();
        int count = rateLimiter.count();

        String combineKey = getCombineKey(rateLimiter, point);
        
        try
        {
            // 获取或创建计数器
            AtomicInteger counter = memoryCache.getCacheObject(combineKey);
            if (counter == null) {
                counter = new AtomicInteger(0);
                memoryCache.setCacheObject(combineKey, counter, time, TimeUnit.SECONDS);
            }
            
            int currentCount = counter.incrementAndGet();
            
            if (currentCount > count)
            {
                throw new ServiceException("访问过于频繁，请稍候再试");
            }
            
            log.info("限制请求'{}',当前请求'{}',缓存key'{}'", count, currentCount, key);
        }
        catch (ServiceException e)
        {
            throw e;
        }
        catch (Exception e)
        {
            throw new RuntimeException("服务器限流异常，请稍候再试");
        }
    }

    public String getCombineKey(RateLimiter rateLimiter, JoinPoint point)
    {
        StringBuffer stringBuffer = new StringBuffer(rateLimiter.key());
        if (rateLimiter.limitType() == LimitType.IP)
        {
            stringBuffer.append(IpUtils.getIpAddr(ServletUtils.getRequest())).append("-");
        }
        MethodSignature signature = (MethodSignature) point.getSignature();
        Method method = signature.getMethod();
        Class<?> targetClass = method.getDeclaringClass();
        stringBuffer.append(targetClass.getName()).append("-").append(method.getName());
        return stringBuffer.toString();
    }
}
