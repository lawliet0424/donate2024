package com.hikdonate.contracts;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
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
public class DonateTokenBank extends Contract {
    public static final String BINARY = "0x6080604052620f424060015533600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040518060800160405280600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020017378731d3ca6b7e34ac0f824c42a7cc18a495cabab73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200173617f2e2fd72fd9d5503197092ac168c91465e7f273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020017317f6ad8ef982297579c203069c1dbffe4348c37273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250600490600461018b92919061020e565b5034801561019857600080fd5b50600154600281905550600154600080600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506102b5565b828054828255906000526020600020908101928215610287579160200282015b828111156102865782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509160200191906001019061022e565b5b5090506102949190610298565b5090565b5b808211156102b1576000816000905550600101610299565b5090565b610a54806102c46000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80638da5cb5b1161005b5780638da5cb5b146100ee578063a8c5af131461010c578063beabacc81461013c578063c3b2d3371461016c5761007d565b806318160ddd1461008257806327e235e3146100a057806380dcbff1146100d0575b600080fd5b61008a61018a565b604051610097919061088a565b60405180910390f35b6100ba60048036038101906100b5919061061f565b610190565b6040516100c7919061088a565b60405180910390f35b6100d86101a8565b6040516100e5919061080d565b60405180910390f35b6100f6610236565b60405161010391906107f2565b60405180910390f35b61012660048036038101906101219190610697565b61025c565b604051610133919061082f565b60405180910390f35b61015660048036038101906101519190610648565b610387565b604051610163919061082f565b60405180910390f35b6101746105ef565b604051610181919061088a565b60405180910390f35b60025481565b60006020528060005260406000206000915090505481565b6060600480548060200260200160405190810160405280929190818152602001828054801561022c57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116101e2575b5050505050905090565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102ee576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102e59061084a565b60405180910390fd5b816002600082825461030091906108ef565b9250508190555081600080600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461037791906108ef565b9250508190555060019050919050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480156104235750816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054105b156104b957816002600082825461043a91906108ef565b9250508190555081600080600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104b191906108ef565b925050819055505b816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561053a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105319061086a565b60405180910390fd5b816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105889190610945565b92505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105dd91906108ef565b92505081905550600190509392505050565b60015481565b600081359050610604816109f0565b92915050565b60008135905061061981610a07565b92915050565b60006020828403121561063157600080fd5b600061063f848285016105f5565b91505092915050565b60008060006060848603121561065d57600080fd5b600061066b868287016105f5565b935050602061067c868287016105f5565b925050604061068d8682870161060a565b9150509250925092565b6000602082840312156106a957600080fd5b60006106b78482850161060a565b91505092915050565b60006106cc83836106d8565b60208301905092915050565b6106e181610979565b82525050565b6106f081610979565b82525050565b6000610701826108b5565b61070b81856108cd565b9350610716836108a5565b8060005b8381101561074757815161072e88826106c0565b9750610739836108c0565b92505060018101905061071a565b5085935050505092915050565b61075d8161098b565b82525050565b60006107706017836108de565b91507f43616c6c6572206973206e6f7420746865206f776e65720000000000000000006000830152602082019050919050565b60006107b06013836108de565b91507f496e73756666696369656e7420746f6b656e73000000000000000000000000006000830152602082019050919050565b6107ec816109b7565b82525050565b600060208201905061080760008301846106e7565b92915050565b6000602082019050818103600083015261082781846106f6565b905092915050565b60006020820190506108446000830184610754565b92915050565b6000602082019050818103600083015261086381610763565b9050919050565b60006020820190508181036000830152610883816107a3565b9050919050565b600060208201905061089f60008301846107e3565b92915050565b6000819050602082019050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b60006108fa826109b7565b9150610905836109b7565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561093a576109396109c1565b5b828201905092915050565b6000610950826109b7565b915061095b836109b7565b92508282101561096e5761096d6109c1565b5b828203905092915050565b600061098482610997565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6109f981610979565b8114610a0457600080fd5b50565b610a10816109b7565b8114610a1b57600080fd5b5056fea2646970667358221220570d768c783e97c711c90f7adcb1b393d9d0af42a9c88c2831aa480cdfd38a9b64736f6c63430008000033";

    private static String librariesLinkedBinary;

    public static final String FUNC__INITIALSUPPLY = "_initialSupply";

    public static final String FUNC_BALANCES = "balances";

    public static final String FUNC_OWNER = "owner";

    public static final String FUNC_TOTALSUPPLY = "totalSupply";

    public static final String FUNC_ADDITIONALMINT = "additionalMint";

    public static final String FUNC_TRANSFER = "transfer";

    public static final String FUNC_GETADMINARRAY = "getAdminArray";

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
        _addresses.put("5777", "0x6917B1399bC385eE211ECb503856da65D9201631");
    }

    @Deprecated
    protected DonateTokenBank(String contractAddress, Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected DonateTokenBank(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected DonateTokenBank(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected DonateTokenBank(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<BigInteger> call__initialSupply() {
        final Function function = new Function(FUNC__INITIALSUPPLY, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> send__initialSupply() {
        final Function function = new Function(
                FUNC__INITIALSUPPLY, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> call_balances(String param0) {
        final Function function = new Function(FUNC_BALANCES, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> send_balances(String param0) {
        final Function function = new Function(
                FUNC_BALANCES, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(param0)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> call_owner() {
        final Function function = new Function(FUNC_OWNER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> send_owner() {
        final Function function = new Function(
                FUNC_OWNER, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> call_totalSupply() {
        final Function function = new Function(FUNC_TOTALSUPPLY, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> send_totalSupply() {
        final Function function = new Function(
                FUNC_TOTALSUPPLY, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> send_additionalMint(BigInteger amount) {
        final Function function = new Function(
                FUNC_ADDITIONALMINT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Boolean> call_additionalMint(BigInteger amount) {
        final Function function = new Function(FUNC_ADDITIONALMINT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<TransactionReceipt> send_transfer(String remitter, String recipient,
            BigInteger amount) {
        final Function function = new Function(
                FUNC_TRANSFER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(remitter), 
                new org.web3j.abi.datatypes.Address(recipient), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Boolean> call_transfer(String remitter, String recipient,
            BigInteger amount) {
        final Function function = new Function(FUNC_TRANSFER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(remitter), 
                new org.web3j.abi.datatypes.Address(recipient), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<List> call_getAdminArray() {
        final Function function = new Function(FUNC_GETADMINARRAY, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<Address>>() {}));
        return new RemoteFunctionCall<List>(function,
                new Callable<List>() {
                    @Override
                    @SuppressWarnings("unchecked")
                    public List call() throws Exception {
                        List<Type> result = (List<Type>) executeCallSingleValueReturn(function, List.class);
                        return convertToNative(result);
                    }
                });
    }

    public RemoteFunctionCall<TransactionReceipt> send_getAdminArray() {
        final Function function = new Function(
                FUNC_GETADMINARRAY, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static DonateTokenBank load(String contractAddress, Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        return new DonateTokenBank(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static DonateTokenBank load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new DonateTokenBank(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static DonateTokenBank load(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        return new DonateTokenBank(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static DonateTokenBank load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new DonateTokenBank(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<DonateTokenBank> deploy(Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        return deployRemoteCall(DonateTokenBank.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), "");
    }

    public static RemoteCall<DonateTokenBank> deploy(Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(DonateTokenBank.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), "");
    }

    @Deprecated
    public static RemoteCall<DonateTokenBank> deploy(Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(DonateTokenBank.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), "");
    }

    @Deprecated
    public static RemoteCall<DonateTokenBank> deploy(Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(DonateTokenBank.class, web3j, transactionManager, gasPrice, gasLimit, getDeploymentBinary(), "");
    }

    public static void linkLibraries(List<Contract.LinkReference> references) {
        librariesLinkedBinary = linkBinaryWithReferences(BINARY, references);
    }

    private static String getDeploymentBinary() {
        if (librariesLinkedBinary != null) {
            return librariesLinkedBinary;
        } else {
            return BINARY;
        }
    }

    protected String getStaticDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static String getPreviouslyDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }
}
