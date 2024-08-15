package com.hikdonate.donate.web3jAPI;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;

/*
Class name: EtherscanAPI
Summary: Sepolia testnet의 verified smart contract에 접속해서, ABI 파일 데이터를 가져온 뒤 json파일로 변환하기
Date: 2024.07.26
Written by: 조현지
*/

public class EtherscanAPI {
    // [하드코딩]이지만, DB나 클라우드와 연동하기 전까지는 하드코딩이 맞음
    @Value("${infura.api-key}")
    private static final String apiKey = null;

    @Value("${abi.file-path}")
    private static final String filePath = null;

    /*
    Function name: getContractABI
    Summary: Sepolia testnet의 스마트 컨트랙트의 ABI 파일 데이터를 가져오는 함수
    Parameter: 총 2개
        String contractAddress; 가져오려는 스마트 컨트랙트 주소
        String contractName; 저장할 때 사용할 json 파일 이름
    Return: 없음
    Caller: Donate2024Application.java의 main
    Date: 2024.07.26
    Written by: 조현지
    */
    public static void getContractABI(String contractAddress, String contractName) throws IOException {
        // Sepolia testnet에 verified된 스마트 컨트랙트 주소
        String url = "https://api-sepolia.etherscan.io/api" +
                "?module=contract" +
                "&action=getabi" +
                "&address=" + contractAddress +
                "&apikey=" + apiKey;

        // Sepolia testnet이 넘겨준 Response 정보 가져오기
        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
        connection.setRequestMethod("GET");

        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        reader.close();

        // 가져온 Response 정보를 문자열(String)으로 변환하기
        String jsonResponse = response.toString();

        // Response 정보 중 "result" 필드에 해당하는 부분(ABI 파일 정보)만 가져오기
        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(jsonResponse);
        String abi = rootNode.path("result").asText();

        // ABI 파일 정보를 가시적으로 보기 위해 재정렬
        JsonNode abiNode = mapper.readTree(abi);
        String prettyAbi = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(abiNode);

        // ABI 파일 정보를 JSON 파일로 변환하기 전에 파일을 저장할 경로, 파일명, ABI 파일 정보 넘기기
        saveToFile(filePath + contractName + ".json", prettyAbi);
    }

    /*
    Function name: saveToFile
    Summary: 넘겨받은 ABI 파일 정보를 파일로 만들어서 지정된 경로에 저장하기
    Parameter: 총 2개
        String filename; 파일을 저장할 경로와 파일명 (상대 경로)
        String data; 파일에 저장할 ABI 파일 정보
    Return: 없음
    Caller: getContractABI
    Date: 2024.07.26
    Written by: 조현지
    */
    private static void saveToFile(String filename, String data) throws IOException {
        // 파일 객체 생성
        File file = new File(filename);

        // 파일이 기존에 존재하지 않으면 지정 경로에 파일을 생성하기
        if (!file.exists()) {
            file.getParentFile().mkdirs();
            file.createNewFile();
        }

        // ABI 파일 정보를 지정된 파일에 저장하기
        try (FileWriter fileWriter = new FileWriter(file)) {
            fileWriter.write(data);
            System.out.println("ABI has been saved to " + file.getCanonicalPath());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
