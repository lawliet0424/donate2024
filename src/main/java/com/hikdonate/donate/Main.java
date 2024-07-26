package com.hikdonate.donate;

import com.hikdonate.contracts.DonateTokenBank;
import com.hikdonate.contracts.MultiTokenTransfer;
import com.hikdonate.contracts.TokenTransfer;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.ClientTransactionManager;
import org.web3j.tx.gas.DefaultGasProvider;

import java.math.BigInteger;


public class Main {
    private static Web3j web3j;
    private static DonateTokenBank donateTokenBank;
    private static TokenTransfer tokenTransfer;
    private static MultiTokenTransfer multiTokenTransfer;

    public static void main(String[] args) throws Exception {
        String rpcURL = "http://127.0.0.1:7545";
        web3j = Web3j.build(new HttpService(rpcURL));

        String privKey = "0x969fc2ecb689744accbc36174287e761c51e6a79c3269a23e4d6dc7ce4f3e4af";
        Credentials credentials = Credentials.create(privKey);
        String fromAddress = "0x2f03497fab1E69daf4e8e6972f892AF86B14de77";

        ClientTransactionManager transactionManager = new ClientTransactionManager(web3j, fromAddress);

        String DonateTokenBankContractAddr = "0x6917B1399bC385eE211ECb503856da65D9201631";
        String TokenTransferContractAddr = "0x6b67eD6A5e7d72dF4a480B4A1Cc9c22a2aAeB3b1";
        String MultiTokenTransferContractAddr = "0xBFbB0bF15B7a74494705D7A10067509089e3092e";

        donateTokenBank = DonateTokenBank.load(DonateTokenBankContractAddr, web3j, transactionManager, new DefaultGasProvider());
        tokenTransfer = TokenTransfer.load(TokenTransferContractAddr, web3j, transactionManager, new DefaultGasProvider());
        multiTokenTransfer = MultiTokenTransfer.load(MultiTokenTransferContractAddr, web3j, transactionManager, new DefaultGasProvider());

        boolean result;

        try {
            result = donateTokenBank.call_additionalMint(BigInteger.valueOf(200)).send();
            System.out.println("test result: " + result);
        } catch (Exception e)  {
            System.out.println("Revert: " + e.getMessage());
        }
    }

}
