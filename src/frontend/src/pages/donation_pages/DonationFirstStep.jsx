import "./DonationFirstStep.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DonationStepsBar from "../../components/DonationStepsBar";
import TagBox from "../../components/TagBox";
import ColoredButton from "../../components/ColoredButton";
import useTag from "../../hooks/useTag";

const DonationFirstStep = () => {
  const { loading, error, getTagCategories } = useTag();
  const [selectedTags, setSelectedTags] = useState(new Set());

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.selectedTags) {
      setSelectedTags(new Set(location.state.selectedTags));
    }
  }, [location.state]);

  const categories = getTagCategories();

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
    navigate("/donation/second", {
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
    <div className="DonationFirstStep">
      <DonationStepsBar stepNow={1} />
      <div className="TagSection">
        {Object.keys(categories).map((category) => (
          <div key={category} className="categorySection">
            <div className="categoryName">{category}</div>
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
      />
    </div>
  );
};

export default DonationFirstStep;
