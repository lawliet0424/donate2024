package com.hikdonate.contracts;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/main/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 1.6.0.
 */
@SuppressWarnings("rawtypes")
public class TokenTransfer extends Contract {
    public static final String BINARY = "Bin file was not provided";

    public static final String FUNC_TRANSFERTRIGGER = "TransferTrigger";

    public static final String FUNC_DONATE_TOKEN_BANK_ADDRESS = "donate_token_bank_address";

    public static final String FUNC_SENDTOKENSTOBENIFICIARY = "sendTokensToBenificiary";

    public static final String FUNC_SENDTOKENSTODONATEBANK = "sendTokensToDonateBank";

    public static final String FUNC_SENDTOKENSTODONATOR = "sendTokensToDonator";



    @Deprecated
    protected TokenTransfer(String contractAddress, Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected TokenTransfer(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected TokenTransfer(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected TokenTransfer(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<TransactionReceipt> TransferTrigger(String donator,
            String beneficiary, BigInteger amount) {
        final Function function = new Function(
                FUNC_TRANSFERTRIGGER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, donator), 
                new org.web3j.abi.datatypes.Address(160, beneficiary), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> donate_token_bank_address() {
        final Function function = new Function(FUNC_DONATE_TOKEN_BANK_ADDRESS, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> sendTokensToBenificiary(String donator,
            String beneficiary, BigInteger amount) {
        final Function function = new Function(
                FUNC_SENDTOKENSTOBENIFICIARY, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, donator), 
                new org.web3j.abi.datatypes.Address(160, beneficiary), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> sendTokensToDonateBank(String beneficiary,
            BigInteger amount) {
        final Function function = new Function(
                FUNC_SENDTOKENSTODONATEBANK, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, beneficiary), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> sendTokensToDonator(String donator,
            BigInteger amount) {
        final Function function = new Function(
                FUNC_SENDTOKENSTODONATOR, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, donator), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static TokenTransfer load(String contractAddress, Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        return new TokenTransfer(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static TokenTransfer load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new TokenTransfer(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static TokenTransfer load(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        return new TokenTransfer(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static TokenTransfer load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new TokenTransfer(contractAddress, web3j, transactionManager, contractGasProvider);
    }
}
