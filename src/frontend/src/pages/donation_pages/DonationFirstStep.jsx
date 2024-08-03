import "./DonationFirstStep.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DonationStepsBar from "../../components/DonationStepsBar";
import TagBox from "../../components/TagBox";
import ColoredButton from "../../components/ColoredButton";

const DonationFirstStep = () => {
  const categories = {
    분류1: [
      "태그1",
      "태그2",
      "태그3",
      "태그4",
      "태그5",
      "태그6",
      "태그7",
      "태그8",
      "태그9",
      "태그10",
      "태그11",
      "태그12",
      "태그13",
      "태그14",
      "태그15",
      "태그16",
      "태그17",
      "태그18",
      "태그19",
      "태그20",
      "태그21",
      "태그22",
    ],
    분류2: ["12", "33", "44", "55", "66", "77", "88", "99", "10", "11"],
  };

  const [selectedTags, setSelectedTags] = useState(new Set());

  const handleTagClick = (tagName) => {
    setSelectedTags((prevSelectedTags) => {
      const newSelectedTags = new Set(prevSelectedTags);
      if (newSelectedTags.has(tagName)) {
        newSelectedTags.delete(tagName);
      } else {
        newSelectedTags.add(tagName);
      }
      return newSelectedTags;
    });
  };

  const navigate = useNavigate();

  const onNextButtonClicked = () => {
    navigate("/donation/second", { state: { fromFirstStep: true } });
  };

  return (
    <div className="DonationFirstStep">
      <DonationStepsBar stepNow={1} />
      {Object.keys(categories).map((category) => (
        <div key={category} className="categorySection">
          <div className="categoryName">{category}</div>
          {categories[category].map((tag) => (
            <TagBox
              key={tag}
              tagName={tag}
              isSelected={selectedTags.has(tag)}
              onTagClick={() => handleTagClick(tag)}
            />
          ))}
        </div>
      ))}
      <ColoredButton
        text={"다음"}
        colorScheme={"Orange"}
        onClick={onNextButtonClicked}
      />
    </div>
  );
};

export default DonationFirstStep;
