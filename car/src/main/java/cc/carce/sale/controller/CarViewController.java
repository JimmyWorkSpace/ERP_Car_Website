package cc.carce.sale.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import cc.carce.sale.dto.CarBaseInfoDto;
import cc.carce.sale.service.CarDealerService;
import cc.carce.sale.service.CarSalesService;
import cc.carce.sale.service.CarService;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.thread.ThreadUtil;
import cn.hutool.json.JSONUtil;

/**
 * 汽车详情页面控制器
 */
@Controller
@CrossOrigin()
@RequestMapping("/")
public class CarViewController {
	
	@Value("${carce.webUrl}")
	private String webUrl;

	@Resource
	private CarService carService;

	@Resource
	private CarSalesService carSalesService;

	@Resource
	private CarDealerService carDealerService;
    
    /**
     * 跳转到汽车详情页面
     */
    @GetMapping("/{uid}")
    public String carDetail(Model model, @PathVariable("uid") String uid, HttpServletRequest req) {
        try {
        	model.addAttribute("image", "");
        	model.addAttribute("imagesJson", JSONUtil.toJsonPrettyStr(new ArrayList<>()));
        	model.addAttribute("videosJson", JSONUtil.toJsonPrettyStr(new ArrayList<>()));

			Future<Boolean> videoF = ThreadUtil.execAsync(() -> {
				List<String> videos = carService.getVideoByUid(uid);
				model.addAttribute("videosJson", JSONUtil.toJsonPrettyStr(videos));

				return true;
			});

//            获取图片
			List<String> images = carService.getImagesByUid(uid);
			if(CollUtil.isNotEmpty(images)) {
				model.addAttribute("image", images.get(0));
			}else {
				model.addAttribute("image", "");
			}

			model.addAttribute("imagesJson", JSONUtil.toJsonPrettyStr(images));
        		


        	
            // 获取车辆基本信息
            CarBaseInfoDto carInfo = carService.getBaseInfoByUidId(uid);
            model.addAttribute("carInfo", carInfo);
            model.addAttribute("carInfoJson", JSONUtil.toJsonPrettyStr(carInfo));
            
            model.addAttribute("carId", uid);
            
            model.addAttribute("content", "/car/detail.ftl");
            
//            设置描述
            model.addAttribute("title", CollUtil.join(CollUtil.newArrayList(carInfo.getBrand(), carInfo.getCustomModel(), carInfo.getManufactureYear()), " "));
            model.addAttribute("description", carInfo.getSaleTitle());
            
            // 设置网站图标
            model.addAttribute("favicon", webUrl + "/favicon.ico");
            
            videoF.get(5, TimeUnit.SECONDS);
            // 获取当前请求的完整URL
            String requestUrl = req.getRequestURL().toString();
            
            model.addAttribute("url", requestUrl);
            
            model.addAttribute("loading", false);
        } catch (Exception e) {
            model.addAttribute("loading", false);
            model.addAttribute("error", "获取数据失败：" + e.getMessage());
        }
        
        return "/layout/main";
    }
    

} 