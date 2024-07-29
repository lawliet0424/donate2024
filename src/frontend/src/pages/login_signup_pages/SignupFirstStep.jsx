import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ColoredButton from "../../components/ColoredButton";
import "./SignupFirstStep.css";

const banks = [
  { name: "은행을 선택하세요", value: "", color: "#808080" },
  { name: "국민은행", value: "국민은행", color: "#000000" },
  { name: "신한은행", value: "신한은행", color: "#000000" },
  { name: "우리은행", value: "우리은행", color: "#000000" },
  { name: "하나은행", value: "하나은행", color: "#000000" },
  { name: "농협은행", value: "농협은행", color: "#000000" },
  { name: "기업은행", value: "기업은행", color: "#000000" },
];

const SignupFirstStep = () => {
  const navigate = useNavigate();

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupBankAccount, setSignupBankAccount] = useState("");
  const [selectedBank, setSelectedBank] = useState(banks[0].value);
  const [selectColor, setSelectColor] = useState(banks[0].color);

  const onNextButtonClicked = () => {
    navigate("/signup/second", {
      state: {
        fromSignupFirst: true,
        signupName,
        signupEmail,
        selectedBank,
        signupBankAccount,
      },
    });
  };

  const onSignupNameChange = (event) => setSignupName(event.target.value);
  const onSignupEmailChange = (event) => setSignupEmail(event.target.value);
  const onSignupBankAccountChange = (event) =>
    setSignupBankAccount(event.target.value);

  const onBankChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedBank(selectedOption);
    const selectedBankColor = banks.find(
      (bank) => bank.value === selectedOption
    ).color;
    setSelectColor(selectedBankColor);
  };

  useEffect(() => {
    setSelectColor(banks.find((bank) => bank.value === selectedBank).color);
  }, [selectedBank]);

  return (
    <div className="SignupFirstStep">
      <div className="title">회원가입</div>
      <input
        placeholder="이름"
        value={signupName}
        onChange={onSignupNameChange}
      />
      <input
        placeholder="이메일"
        value={signupEmail}
        onChange={onSignupEmailChange}
      />
      <select
        value={selectedBank}
        onChange={onBankChange}
        style={{ color: selectColor }}
      >
        {banks.map((bank, index) => (
          <option key={index} value={bank.value} style={{ color: bank.color }}>
            {bank.name}
          </option>
        ))}
      </select>
      <input
        placeholder="계좌 번호"
        value={signupBankAccount}
        onChange={onSignupBankAccountChange}
      />
      <ColoredButton text="다음" type="Orange" onClick={onNextButtonClicked} />
    </div>
  );
};

export default SignupFirstStep;
