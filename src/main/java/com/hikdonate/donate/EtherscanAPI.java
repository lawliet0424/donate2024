package com.hikdonate.donate;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class EtherscanAPI {
    private static final String apiKey = "QEJBFXZB62T9MVG2YVD2HS4ZG1SZU458XG";
    private static final String filePath = "src/main/resources/contracts/";

    public static void getContractABI(String contractAddress, String contractName) throws IOException {
        String url = "https://api-sepolia.etherscan.io/api" +
                "?module=contract" +
                "&action=getabi" +
                "&address=" + contractAddress +
                "&apikey=" + apiKey;

        HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
        connection.setRequestMethod("GET");

        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            response.append(line);
        }
        reader.close();

        String jsonResponse = response.toString();

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(jsonResponse);
        String abi = rootNode.path("result").asText();
        JsonNode abiNode = mapper.readTree(abi);
        String prettyAbi = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(abiNode);

        saveToFile(filePath + contractName + ".json", prettyAbi);
    }

    private static void saveToFile(String filename, String data) throws IOException {
        File file = new File(filename);

        if (!file.exists()) {
            file.getParentFile().mkdirs();
            file.createNewFile();
        }

        try (FileWriter fileWriter = new FileWriter(file)) {
            fileWriter.write(data);
            System.out.println("ABI has been saved to " + file.getCanonicalPath());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
