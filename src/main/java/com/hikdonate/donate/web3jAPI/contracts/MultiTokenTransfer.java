package com.hikdonate.donate.web3jAPI.contracts;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple2;
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
public class MultiTokenTransfer extends Contract {
    public static final String BINARY = "Bin file was not provided";

    public static final String FUNC_MULTITRANSFERTRIGGER = "MultiTransferTrigger";

    public static final String FUNC_DONATE_TOKEN_BANK_ADDRESS = "donate_token_bank_address";

    public static final String FUNC_GETREVERTEDLIST = "getRevertedList";

    public static final String FUNC_REVERTED_LIST_1 = "reverted_list_1";

    public static final String FUNC_REVERTED_LIST_2 = "reverted_list_2";

    public static final String FUNC_SENDBATCHTOKENSTOBENIFICIARY = "sendBatchTokensToBenificiary";

    public static final String FUNC_SENDBATCHTOKENSTODONATEBANK = "sendBatchTokensToDonateBank";

    public static final String FUNC_SENDTOKENSTODONATOR = "sendTokensToDonator";

    @Deprecated
    protected MultiTokenTransfer(String contractAddress, Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected MultiTokenTransfer(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected MultiTokenTransfer(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected MultiTokenTransfer(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<TransactionReceipt> MultiTransferTrigger(String donator,
            List<String> beneficiary_list, BigInteger divided_amount) {
        final Function function = new Function(
                FUNC_MULTITRANSFERTRIGGER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, donator), 
                new org.web3j.abi.datatypes.DynamicArray<org.web3j.abi.datatypes.Address>(
                        org.web3j.abi.datatypes.Address.class,
                        org.web3j.abi.Utils.typeMap(beneficiary_list, org.web3j.abi.datatypes.Address.class)), 
                new org.web3j.abi.datatypes.generated.Uint256(divided_amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> donate_token_bank_address() {
        final Function function = new Function(FUNC_DONATE_TOKEN_BANK_ADDRESS, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<Tuple2<List<String>, List<String>>> getRevertedList() {
        final Function function = new Function(FUNC_GETREVERTEDLIST, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<Address>>() {}, new TypeReference<DynamicArray<Address>>() {}));
        return new RemoteFunctionCall<Tuple2<List<String>, List<String>>>(function,
                new Callable<Tuple2<List<String>, List<String>>>() {
                    @Override
                    public Tuple2<List<String>, List<String>> call() throws Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple2<List<String>, List<String>>(
                                convertToNative((List<Address>) results.get(0).getValue()), 
                                convertToNative((List<Address>) results.get(1).getValue()));
                    }
                });
    }

    public RemoteFunctionCall<String> reverted_list_1(BigInteger param0) {
        final Function function = new Function(FUNC_REVERTED_LIST_1, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> reverted_list_2(BigInteger param0) {
        final Function function = new Function(FUNC_REVERTED_LIST_2, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> sendBatchTokensToBenificiary(String donator,
            List<String> beneficiary_list, BigInteger divided_amount) {
        final Function function = new Function(
                FUNC_SENDBATCHTOKENSTOBENIFICIARY, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, donator), 
                new org.web3j.abi.datatypes.DynamicArray<org.web3j.abi.datatypes.Address>(
                        org.web3j.abi.datatypes.Address.class,
                        org.web3j.abi.Utils.typeMap(beneficiary_list, org.web3j.abi.datatypes.Address.class)), 
                new org.web3j.abi.datatypes.generated.Uint256(divided_amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> sendBatchTokensToDonateBank(
            List<String> beneficiary_list, BigInteger divided_amount) {
        final Function function = new Function(
                FUNC_SENDBATCHTOKENSTODONATEBANK, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.DynamicArray<org.web3j.abi.datatypes.Address>(
                        org.web3j.abi.datatypes.Address.class,
                        org.web3j.abi.Utils.typeMap(beneficiary_list, org.web3j.abi.datatypes.Address.class)), 
                new org.web3j.abi.datatypes.generated.Uint256(divided_amount)), 
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
    public static MultiTokenTransfer load(String contractAddress, Web3j web3j,
            Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new MultiTokenTransfer(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static MultiTokenTransfer load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new MultiTokenTransfer(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static MultiTokenTransfer load(String contractAddress, Web3j web3j,
            Credentials credentials, ContractGasProvider contractGasProvider) {
        return new MultiTokenTransfer(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static MultiTokenTransfer load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new MultiTokenTransfer(contractAddress, web3j, transactionManager, contractGasProvider);
    }
}
