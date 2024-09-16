import "./DonationStepOne.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DonationStepsBar from "../../components/DonationStepsBar";
import TagBox from "../../components/TagBox";
import ColoredButton from "../../components/ColoredButton";
import useTag from "../../hooks/useTag";

const DonationStepOne = () => {
  const { getTags, getTagCategories, loading, error } = useTag();
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [categories, setCategories] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initialize = async () => {
      if (location.state?.selectedTags) {
        setSelectedTags(new Set(location.state.selectedTags));
      }
      try {
        await getTags();
        const updatedCategories = getTagCategories();
        setCategories(updatedCategories);
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      }
    };

    initialize();
  }, [location.state, getTags, getTagCategories]);

  const handleTagClick = (tagId) => {
    setSelectedTags((prevSelectedTags) => {
      const newSelectedTags = new Set(prevSelectedTags);
      if (newSelectedTags.has(tagId)) {
        newSelectedTags.delete(tagId);
      } else {
        newSelectedTags.add(tagId);
      }
      return newSelectedTags;
    });
  };

  const onNextButtonClicked = () => {
    navigate("/donation/step2", {
      state: {
        fromFirstStep: true,
        selectedTags: Array.from(selectedTags),
      },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading tags: {error.message}</div>;
  }

  return (
    <div className="donation-step-one">
      <DonationStepsBar currentStep={1} />
      <div className="donation-step-one__tags">
        {Object.keys(categories).map((category) => (
          <div key={category} className="donation-step-one__section">
            <div className="donation-step-one__category">{category}</div>
            {categories[category].map((tag) => (
              <TagBox
                key={tag.id}
                tagName={tag.name}
                isTagSelected={selectedTags.has(tag.id)}
                onTagClick={() => handleTagClick(tag.id)}
              />
            ))}
          </div>
        ))}
      </div>
      <ColoredButton
        text={"다음"}
        colorScheme={"orange"}
        onClick={onNextButtonClicked}
        className={"donation-step-one__button"}
      />
    </div>
  );
};

export default DonationStepOne;
