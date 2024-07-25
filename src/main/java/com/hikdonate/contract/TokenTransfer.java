package com.hikdonate.contract;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Bool;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
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
public class TokenTransfer extends Contract {
    public static final String BINARY = "0x60806040523480156200001157600080fd5b5060405162001183380380620011838339818101604052810190620000379190620004cb565b6040518060600160405280600015151515815260200160001515151581526020016000151515158152506002906003620000739291906200023c565b50806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b158015620000fb57600080fd5b505afa15801562000110573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200013691906200045a565b600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166380dcbff16040518163ffffffff1660e01b815260040160006040518083038186803b158015620001dd57600080fd5b505afa158015620001f2573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906200021d919062000486565b6003908051906020019062000234929190620002dc565b505062000605565b826003601f01602090048101928215620002c95791602002820160005b838211156200029857835183826101000a81548160ff021916908315150217905550926020019260010160208160000104928301926001030262000259565b8015620002c75782816101000a81549060ff021916905560010160208160000104928301926001030262000298565b505b509050620002d891906200036b565b5090565b82805482825590600052602060002090810192821562000358579160200282015b82811115620003575782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190620002fd565b5b5090506200036791906200036b565b5090565b5b80821115620003865760008160009055506001016200036c565b5090565b6000620003a16200039b846200052b565b620004f7565b90508083825260208201905082856020860282011115620003c157600080fd5b60005b85811015620003f55781620003da8882620003ff565b845260208401935060208301925050600181019050620003c4565b5050509392505050565b6000815190506200041081620005d1565b92915050565b600082601f8301126200042857600080fd5b81516200043a8482602086016200038a565b91505092915050565b6000815190506200045481620005eb565b92915050565b6000602082840312156200046d57600080fd5b60006200047d84828501620003ff565b91505092915050565b6000602082840312156200049957600080fd5b600082015167ffffffffffffffff811115620004b457600080fd5b620004c28482850162000416565b91505092915050565b600060208284031215620004de57600080fd5b6000620004ee8482850162000443565b91505092915050565b6000604051905081810181811067ffffffffffffffff82111715620005215762000520620005a2565b5b8060405250919050565b600067ffffffffffffffff821115620005495762000548620005a2565b5b602082029050602081019050919050565b6000620005678262000582565b9050919050565b60006200057b826200055a565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620005dc816200055a565b8114620005e857600080fd5b50565b620005f6816200056e565b81146200060257600080fd5b50565b610b6e80620006156000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806302ea48a61461005c5780632c84881614610078578063b2b0b70814610094578063cd4aedf1146100b2578063f7d3e1b1146100e2575b600080fd5b6100766004803603810190610071919061078e565b6100fe565b005b610092600480360381019061008d91906107dd565b61029f565b005b61009c610460565b6040516100a99190610955565b60405180910390f35b6100cc60048036038101906100c7919061078e565b610486565b6040516100d991906109a7565b60405180910390f35b6100fc60048036038101906100f791906107dd565b610500565b005b6002600060038110610139577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602091828204019190069054906101000a900460ff1661018e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161018590610a02565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663beabacc88484846040518463ffffffff1660e01b81526004016101eb93929190610970565b602060405180830381600087803b15801561020557600080fd5b505af1158015610219573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061023d9190610819565b506001600260016003811061027b577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602091828204019190066101000a81548160ff021916908315150217905550505050565b60026001600381106102da577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602091828204019190069054906101000a900460ff1661032f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610326906109c2565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663beabacc883600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518463ffffffff1660e01b81526004016103ae93929190610970565b602060405180830381600087803b1580156103c857600080fd5b505af11580156103dc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104009190610819565b5060016002806003811061043d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602091828204019190066101000a81548160ff0219169083151502179055505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006104928483610500565b61049d8484846100fe565b6104a7838361029f565b600280600381106104e1577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602091828204019190069054906101000a900460ff1690509392505050565b6105093361067a565b610548576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161053f906109e2565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663beabacc8600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684846040518463ffffffff1660e01b81526004016105c793929190610970565b602060405180830381600087803b1580156105e157600080fd5b505af11580156105f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106199190610819565b5060016002600060038110610657577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602091828204019190066101000a81548160ff0219169083151502179055505050565b600080600090505b600380549050811015610744578273ffffffffffffffffffffffffffffffffffffffff16600382815481106106e0577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561073157600191505061074a565b808061073c90610a7b565b915050610682565b50600090505b919050565b60008135905061075e81610af3565b92915050565b60008151905061077381610b0a565b92915050565b60008135905061078881610b21565b92915050565b6000806000606084860312156107a357600080fd5b60006107b18682870161074f565b93505060206107c28682870161074f565b92505060406107d386828701610779565b9150509250925092565b600080604083850312156107f057600080fd5b60006107fe8582860161074f565b925050602061080f85828601610779565b9150509250929050565b60006020828403121561082b57600080fd5b600061083984828501610764565b91505092915050565b61084b81610a33565b82525050565b61085a81610a45565b82525050565b600061086d602383610a22565b91507f62656e656669636961727920646964206e6f74207265636569766520746f6b6560008301527f6e732e00000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006108d3601783610a22565b91507f43616c6c6572206973206e6f74207468652061646d696e0000000000000000006000830152602082019050919050565b6000610913601d83610a22565b91507f446f6e6f7220646964206e6f74207265636569766520746f6b656e732e0000006000830152602082019050919050565b61094f81610a71565b82525050565b600060208201905061096a6000830184610842565b92915050565b60006060820190506109856000830186610842565b6109926020830185610842565b61099f6040830184610946565b949350505050565b60006020820190506109bc6000830184610851565b92915050565b600060208201905081810360008301526109db81610860565b9050919050565b600060208201905081810360008301526109fb816108c6565b9050919050565b60006020820190508181036000830152610a1b81610906565b9050919050565b600082825260208201905092915050565b6000610a3e82610a51565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000610a8682610a71565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610ab957610ab8610ac4565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b610afc81610a33565b8114610b0757600080fd5b50565b610b1381610a45565b8114610b1e57600080fd5b50565b610b2a81610a71565b8114610b3557600080fd5b5056fea26469706673582212208043f41d0e4f404a2c992c6754208cb1c5eb5b251535598b2cc84e3cc1d0f68664736f6c63430008000033";

    private static String librariesLinkedBinary;

    public static final String FUNC_DONATE_TOKEN_BANK_ADDRESS = "donate_token_bank_address";

    public static final String FUNC_TRANSFERTRIGGER = "TransferTrigger";

    public static final String FUNC_SENDTOKENSTODONATOR = "sendTokensToDonator";

    public static final String FUNC_SENDTOKENSTOBENIFICIARY = "sendTokensToBenificiary";

    public static final String FUNC_SENDTOKENSTODONATEBANK = "sendTokensToDonateBank";

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
        _addresses.put("5777", "0x6b67eD6A5e7d72dF4a480B4A1Cc9c22a2aAeB3b1");
    }

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

    public RemoteFunctionCall<String> call_donate_token_bank_address() {
        final Function function = new Function(FUNC_DONATE_TOKEN_BANK_ADDRESS, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> send_donate_token_bank_address() {
        final Function function = new Function(
                FUNC_DONATE_TOKEN_BANK_ADDRESS, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> send_TransferTrigger(String donator,
            String beneficiary, BigInteger amount) {
        final Function function = new Function(
                FUNC_TRANSFERTRIGGER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(donator), 
                new org.web3j.abi.datatypes.Address(beneficiary), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Boolean> call_TransferTrigger(String donator, String beneficiary,
            BigInteger amount) {
        final Function function = new Function(FUNC_TRANSFERTRIGGER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(donator), 
                new org.web3j.abi.datatypes.Address(beneficiary), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Bool>() {}));
        return executeRemoteCallSingleValueReturn(function, Boolean.class);
    }

    public RemoteFunctionCall<TransactionReceipt> send_sendTokensToDonator(String donator,
            BigInteger amount) {
        final Function function = new Function(
                FUNC_SENDTOKENSTODONATOR, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(donator), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> send_sendTokensToBenificiary(String donator,
            String beneficiary, BigInteger amount) {
        final Function function = new Function(
                FUNC_SENDTOKENSTOBENIFICIARY, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(donator), 
                new org.web3j.abi.datatypes.Address(beneficiary), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> send_sendTokensToDonateBank(String beneficiary,
            BigInteger amount) {
        final Function function = new Function(
                FUNC_SENDTOKENSTODONATEBANK, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(beneficiary), 
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

    public static RemoteCall<TokenTransfer> deploy(Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider, String _donate_token_bank) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_donate_token_bank)));
        return deployRemoteCall(TokenTransfer.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    public static RemoteCall<TokenTransfer> deploy(Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider,
            String _donate_token_bank) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_donate_token_bank)));
        return deployRemoteCall(TokenTransfer.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<TokenTransfer> deploy(Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit, String _donate_token_bank) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_donate_token_bank)));
        return deployRemoteCall(TokenTransfer.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<TokenTransfer> deploy(Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit,
            String _donate_token_bank) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_donate_token_bank)));
        return deployRemoteCall(TokenTransfer.class, web3j, transactionManager, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
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
