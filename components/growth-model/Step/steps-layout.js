import ChooseProfession from "components/growth-model/Step/choose-profession";
import ExecutePlan from "components/growth-model/Step/execute-plan";
import ChooseSkills from "components/growth-model/Step/choose-skills";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const GrowthModelStepsLayout = ({ pagevalue, setShowDepartment }) => {
  const router = useRouter();
  const [lang] = useTranslation("language");
  const [current, setCurrent] = useState(pagevalue);
  const { growthModelDetail, growthProject } = useSelector(({ growth }) => growth);

  const steps = [
    {
      title: lang("GROWTH_MODEL.GM_STEPONE_PROFESSION"),
      content: <ChooseProfession setShowDepartment={setShowDepartment} />,
    },
    {
      title: lang("GROWTH_MODEL.GM_STEPONE_CHOOSE_SKILLS"),
      content: <ChooseSkills />,
    },
    {
      title: lang("GROWTH_MODEL.GM_STEPONE_EXECUTE_PLAN"),
      content: <ExecutePlan />,
    },
  ];

  useEffect(() => {
    setCurrent(pagevalue);
  }, [pagevalue]);

  useEffect(() => {
    if (
      (Object.keys(growthModelDetail).length > 1 && current > 0) ||
      (Object.keys(growthModelDetail).length === 1 && current === 0)
    ) {
      setCurrent(current);
      router.push({
        pathname: "/growth-model",
        query: { title: steps[current]?.title },
      });
    }
  }, [current]);

  useEffect(() => {
    const handlePopState = () => {
      const titleQuery = new URLSearchParams(window.location.search).get(
        "title"
      );
      const stepIndex = steps.findIndex((step) => step.title === titleQuery);
      setCurrent(stepIndex);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleStepClick = (stepIndex, stepTitle) => {
    if (stepIndex > 0 && _.isEmpty(growthProject)) {

      setCurrent(0);
      router.push({
        pathname: "/growth-model"
      });
      return;
    }
    if (growthProject.isDeleted && stepIndex !== 2) {
      setCurrent(0);
      router.push({
        pathname: "/growth-model"
      });
      return;
    }
    setCurrent(stepIndex);
    router.push({
      pathname: "/growth-model",
      query: { title: stepTitle },
    });
  };

  return (
    <div>
      <Card className="px-3 py-3">
        <div className="steps-container">
          {steps.map((step, index) => (
            <>
              <Button
                key={index}
                className={`step-button ${index === current ? "active" : ""
                  } flex-grow-1`}
                onClick={() => handleStepClick(index, step.title)}
              >
                {`${index + 1}. ${step.title}`}
              </Button>
              {index < steps.length - 1 && (
                <div className="separation-line"></div>
              )}
            </>
          ))}
        </div>
      </Card>

      <div className="steps-content mt-4">
        {steps.length > 0 && steps[current]?.content}
      </div>
    </div>
  );
};

export default GrowthModelStepsLayout;
