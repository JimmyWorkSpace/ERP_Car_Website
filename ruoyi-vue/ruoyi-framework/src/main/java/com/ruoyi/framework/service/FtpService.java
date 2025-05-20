package com.ruoyi.framework.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.springframework.stereotype.Service;

import com.ruoyi.framework.config.FtpProperties;

@Service
@Slf4j
public class FtpService {
    private final FtpProperties ftpProperties;
    private final FTPClient ftpClient;

    public FtpService(FtpProperties ftpProperties) {
        this.ftpProperties = ftpProperties;
        this.ftpClient = new FTPClient();
    }

    private void connect() throws IOException {
        if (!ftpClient.isConnected()) {
            ftpClient.connect(ftpProperties.getServer(), ftpProperties.getPort());
            ftpClient.login(ftpProperties.getUser(), ftpProperties.getPassword());
            ftpClient.enterLocalPassiveMode();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
        }
    }

    private void disconnect() throws IOException {
        if (ftpClient.isConnected()) {
            ftpClient.logout();
            ftpClient.disconnect();
        }
    }

    public List<String> listFiles(String remoteDir) throws Exception {
        List<String> fileList = new ArrayList<>();

        try {
            connect();
            FTPFile[] files = ftpClient.listFiles(remoteDir);

            for (FTPFile file : files) {
                fileList.add(file.getName());
            }
        } catch(Exception e) {
            log.error("通过Ftp获取文件信息失败", e);
            throw e;
        }

        return fileList;
    }
}