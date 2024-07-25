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
public class MultiTokenTransfer extends Contract {
    public static final String BINARY = "0x60806040526040518060200160405280734b0897b0513fdc7c541b6d9d7e929c4e5364d2db73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152506002906001620000659291906200027c565b503480156200007357600080fd5b506040516200181c3803806200181c8339818101604052810190620000999190620004fa565b6000600160146101000a81548160ff021916908315150217905550806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6040518163ffffffff1660e01b815260040160206040518083038186803b1580156200013b57600080fd5b505afa15801562000150573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019062000176919062000489565b600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166380dcbff16040518163ffffffff1660e01b815260040160006040518083038186803b1580156200021d57600080fd5b505afa15801562000232573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906200025d9190620004b5565b60049080519060200190620002749291906200030b565b505062000634565b828054828255906000526020600020908101928215620002f8579160200282015b82811115620002f75782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550916020019190600101906200029d565b5b5090506200030791906200039a565b5090565b82805482825590600052602060002090810192821562000387579160200282015b82811115620003865782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550916020019190600101906200032c565b5b5090506200039691906200039a565b5090565b5b80821115620003b55760008160009055506001016200039b565b5090565b6000620003d0620003ca846200055a565b62000526565b90508083825260208201905082856020860282011115620003f057600080fd5b60005b858110156200042457816200040988826200042e565b845260208401935060208301925050600181019050620003f3565b5050509392505050565b6000815190506200043f8162000600565b92915050565b600082601f8301126200045757600080fd5b815162000469848260208601620003b9565b91505092915050565b60008151905062000483816200061a565b92915050565b6000602082840312156200049c57600080fd5b6000620004ac848285016200042e565b91505092915050565b600060208284031215620004c857600080fd5b600082015167ffffffffffffffff811115620004e357600080fd5b620004f18482850162000445565b91505092915050565b6000602082840312156200050d57600080fd5b60006200051d8482850162000472565b91505092915050565b6000604051905081810181811067ffffffffffffffff8211171562000550576200054f620005d1565b5b8060405250919050565b600067ffffffffffffffff821115620005785762000577620005d1565b5b602082029050602081019050919050565b60006200059682620005b1565b9050919050565b6000620005aa8262000589565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200060b8162000589565b81146200061757600080fd5b50565b62000625816200059d565b81146200063157600080fd5b50565b6111d880620006446000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063513658b61161005b578063513658b6146100fe57806394990fcf1461011a578063b2b0b7081461014a578063f7d3e1b1146101685761007d565b8063121948bc146100825780632f6bb6811461009e5780633c13f1e8146100ce575b600080fd5b61009c60048036038101906100979190610c06565b610184565b005b6100b860048036038101906100b39190610b63565b61041d565b6040516100c59190610eb7565b60405180910390f35b6100e860048036038101906100e39190610c83565b610472565b6040516100f59190610e65565b60405180910390f35b61011860048036038101906101139190610b63565b6104b1565b005b610134600480360381019061012f9190610c83565b61070d565b6040516101419190610e65565b60405180910390f35b61015261074c565b60405161015f9190610e65565b60405180910390f35b610182600480360381019061017d9190610bca565b610772565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610214576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161020b90610ed2565b60405180910390fd5b600082511415610259576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161025090610f52565b60405180910390fd5b60005b82518110156104185760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663beabacc88483815181106102da577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015133856040518463ffffffff1660e01b815260040161030293929190610e80565b602060405180830381600087803b15801561031c57600080fd5b505af192505050801561034d57506040513d601f19601f8201168201806040525081019061034a9190610c5a565b60015b61040357600383828151811061038c577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101519080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506103fe83826108aa565b610405565b505b8080610410906110b6565b91505061025c565b505050565b60008083518361042d9190610fe0565b90506104398582610772565b6104448585856104b1565b61044e8484610184565b600060028054905014801561046857506000600380549050145b9150509392505050565b6002818154811061048257600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6104ba336109b9565b6104f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104f090610ef2565b60405180910390fd5b600160149054906101000a900460ff16610548576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161053f90610f12565b60405180910390fd5b60005b82518110156107075760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663beabacc8858584815181106105ca577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151856040518463ffffffff1660e01b81526004016105f193929190610e80565b602060405180830381600087803b15801561060b57600080fd5b505af192505050801561063c57506040513d601f19601f820116820180604052508101906106399190610c5a565b60015b6106f257600283828151811061067b577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101519080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506106ed83826108aa565b6106f4565b505b80806106ff906110b6565b91505061054b565b50505050565b6003818154811061071d57600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61077b336109b9565b6107ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107b190610ef2565b60405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663beabacc8600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684846040518463ffffffff1660e01b815260040161083993929190610e80565b602060405180830381600087803b15801561085357600080fd5b505af1158015610867573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061088b9190610c5a565b5060018060146101000a81548160ff0219169083151502179055505050565b815181106108ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108e490610f32565b60405180910390fd5b81600183516108fc919061103a565b81518110610933577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010151828281518110610974577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050600182510382525050565b600080600090505b600480549050811015610a83578273ffffffffffffffffffffffffffffffffffffffff1660048281548110610a1f577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610a70576001915050610a89565b8080610a7b906110b6565b9150506109c1565b50600090505b919050565b6000610aa1610a9c84610fa3565b610f72565b90508083825260208201905082856020860282011115610ac057600080fd5b60005b85811015610af05781610ad68882610afa565b845260208401935060208301925050600181019050610ac3565b5050509392505050565b600081359050610b098161115d565b92915050565b600082601f830112610b2057600080fd5b8135610b30848260208601610a8e565b91505092915050565b600081519050610b4881611174565b92915050565b600081359050610b5d8161118b565b92915050565b600080600060608486031215610b7857600080fd5b6000610b8686828701610afa565b935050602084013567ffffffffffffffff811115610ba357600080fd5b610baf86828701610b0f565b9250506040610bc086828701610b4e565b9150509250925092565b60008060408385031215610bdd57600080fd5b6000610beb85828601610afa565b9250506020610bfc85828601610b4e565b9150509250929050565b60008060408385031215610c1957600080fd5b600083013567ffffffffffffffff811115610c3357600080fd5b610c3f85828601610b0f565b9250506020610c5085828601610b4e565b9150509250929050565b600060208284031215610c6c57600080fd5b6000610c7a84828501610b39565b91505092915050565b600060208284031215610c9557600080fd5b6000610ca384828501610b4e565b91505092915050565b610cb58161106e565b82525050565b610cc481611080565b82525050565b6000610cd7601783610fcf565b91507f43616c6c6572206973206e6f7420746865206f776e65720000000000000000006000830152602082019050919050565b6000610d17601783610fcf565b91507f43616c6c6572206973206e6f74207468652061646d696e0000000000000000006000830152602082019050919050565b6000610d57602183610fcf565b91507f446f6e6f7220646964206e6f742072656365697665642074686520746f6b656e60008301527f2e000000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000610dbd601383610fcf565b91507f496e646578206f7574206f6620626f756e6473000000000000000000000000006000830152602082019050919050565b6000610dfd602d83610fcf565b91507f6e6f6e65206f66207468652062656e656669636961726965732072656365697660008301527f65642074686520746f6b656e2e000000000000000000000000000000000000006020830152604082019050919050565b610e5f816110ac565b82525050565b6000602082019050610e7a6000830184610cac565b92915050565b6000606082019050610e956000830186610cac565b610ea26020830185610cac565b610eaf6040830184610e56565b949350505050565b6000602082019050610ecc6000830184610cbb565b92915050565b60006020820190508181036000830152610eeb81610cca565b9050919050565b60006020820190508181036000830152610f0b81610d0a565b9050919050565b60006020820190508181036000830152610f2b81610d4a565b9050919050565b60006020820190508181036000830152610f4b81610db0565b9050919050565b60006020820190508181036000830152610f6b81610df0565b9050919050565b6000604051905081810181811067ffffffffffffffff82111715610f9957610f9861112e565b5b8060405250919050565b600067ffffffffffffffff821115610fbe57610fbd61112e565b5b602082029050602081019050919050565b600082825260208201905092915050565b6000610feb826110ac565b9150610ff6836110ac565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561102f5761102e6110ff565b5b828202905092915050565b6000611045826110ac565b9150611050836110ac565b925082821015611063576110626110ff565b5b828203905092915050565b60006110798261108c565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006110c1826110ac565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156110f4576110f36110ff565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6111668161106e565b811461117157600080fd5b50565b61117d81611080565b811461118857600080fd5b50565b611194816110ac565b811461119f57600080fd5b5056fea26469706673582212204ca3e7cc8d291e1fa97d6ac6c39f1a6a3f0385cc56ff0ca615d34b9ab3ff0f3764736f6c63430008000033";

    private static String librariesLinkedBinary;

    public static final String FUNC_DONATE_TOKEN_BANK_ADDRESS = "donate_token_bank_address";

    public static final String FUNC_REVERTED_LIST_1 = "reverted_list_1";

    public static final String FUNC_REVERTED_LIST_2 = "reverted_list_2";

    public static final String FUNC_MULTITRANSFERTRIGGER = "MultiTransferTrigger";

    public static final String FUNC_SENDTOKENSTODONATOR = "sendTokensToDonator";

    public static final String FUNC_SENDBATCHTOKENSTOBENIFICIARY = "sendBatchTokensToBenificiary";

    public static final String FUNC_SENDBATCHTOKENSTODONATEBANK = "sendBatchTokensToDonateBank";

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
        _addresses.put("5777", "0xBFbB0bF15B7a74494705D7A10067509089e3092e");
    }

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

    public RemoteFunctionCall<String> call_reverted_list_1(BigInteger param0) {
        final Function function = new Function(FUNC_REVERTED_LIST_1, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> send_reverted_list_1(BigInteger param0) {
        final Function function = new Function(
                FUNC_REVERTED_LIST_1, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> call_reverted_list_2(BigInteger param0) {
        final Function function = new Function(FUNC_REVERTED_LIST_2, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> send_reverted_list_2(BigInteger param0) {
        final Function function = new Function(
                FUNC_REVERTED_LIST_2, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> send_MultiTransferTrigger(String donator,
            List<String> beneficiary_list, BigInteger divided_amount) {
        final Function function = new Function(
                FUNC_MULTITRANSFERTRIGGER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(donator), 
                new org.web3j.abi.datatypes.DynamicArray<org.web3j.abi.datatypes.Address>(
                        org.web3j.abi.datatypes.Address.class,
                        org.web3j.abi.Utils.typeMap(beneficiary_list, org.web3j.abi.datatypes.Address.class)), 
                new org.web3j.abi.datatypes.generated.Uint256(divided_amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Boolean> call_MultiTransferTrigger(String donator,
            List<String> beneficiary_list, BigInteger divided_amount) {
        final Function function = new Function(FUNC_MULTITRANSFERTRIGGER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(donator), 
                new org.web3j.abi.datatypes.DynamicArray<org.web3j.abi.datatypes.Address>(
                        org.web3j.abi.datatypes.Address.class,
                        org.web3j.abi.Utils.typeMap(beneficiary_list, org.web3j.abi.datatypes.Address.class)), 
                new org.web3j.abi.datatypes.generated.Uint256(divided_amount)), 
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

    public RemoteFunctionCall<TransactionReceipt> send_sendBatchTokensToBenificiary(String donator,
            List<String> beneficiary_list, BigInteger divided_amount) {
        final Function function = new Function(
                FUNC_SENDBATCHTOKENSTOBENIFICIARY, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(donator), 
                new org.web3j.abi.datatypes.DynamicArray<org.web3j.abi.datatypes.Address>(
                        org.web3j.abi.datatypes.Address.class,
                        org.web3j.abi.Utils.typeMap(beneficiary_list, org.web3j.abi.datatypes.Address.class)), 
                new org.web3j.abi.datatypes.generated.Uint256(divided_amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> send_sendBatchTokensToDonateBank(
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

    public static RemoteCall<MultiTokenTransfer> deploy(Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider, String _donate_token_bank) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_donate_token_bank)));
        return deployRemoteCall(MultiTokenTransfer.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    public static RemoteCall<MultiTokenTransfer> deploy(Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider,
            String _donate_token_bank) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_donate_token_bank)));
        return deployRemoteCall(MultiTokenTransfer.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<MultiTokenTransfer> deploy(Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit, String _donate_token_bank) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_donate_token_bank)));
        return deployRemoteCall(MultiTokenTransfer.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<MultiTokenTransfer> deploy(Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit,
            String _donate_token_bank) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(_donate_token_bank)));
        return deployRemoteCall(MultiTokenTransfer.class, web3j, transactionManager, gasPrice, gasLimit, getDeploymentBinary(), encodedConstructor);
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
