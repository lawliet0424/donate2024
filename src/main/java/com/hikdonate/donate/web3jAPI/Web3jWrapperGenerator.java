package com.hikdonate.donate.web3jAPI;

import java.io.IOException;

public class Web3jWrapperGenerator { // web3j의 경로
    private static final String WEB3J_PATH = "C:/Users/yhyh1/.web3j/web3j-cli-shadow-1.6.0/bin/web3j.bat";
    private static final String ABI_PATH = "src/main/resources/contracts/";
    private static final String OUTPUT_DIR = "src/main/java"; // Java wrapper 클래스가 생성될 디렉토리
    private static final String PACKAGE_NAME = "com.hikdonate.contracts"; // 생성될 Java 클래스의 패키지 이름

    public static void generateWrapper(String abiFile) throws IOException, IOException {
        String command = String.format(
                "%s generate solidity -a=%s -o=%s -p=%s",
                WEB3J_PATH,
                ABI_PATH + abiFile,
                OUTPUT_DIR,
                PACKAGE_NAME
        );

        ProcessBuilder processBuilder = new ProcessBuilder(command.split(" "));
        processBuilder.inheritIO(); // 콘솔 출력

        Process process = processBuilder.start();
        try {
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                System.out.println("Java wrapper generated for: " + abiFile);
            } else {
                System.err.println("Error generating wrapper for: " + abiFile);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
