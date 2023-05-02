import "./index.scss";
import React from "react";
import { LimeButton } from "components/Buttons/LimeButton";
import { GreyButton } from "components/Buttons/GreyButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const ContentWrapper = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="content-wrapper-2 vw-100 p-3 p-lg-5">
      <div className="row align-items-center justify-content-center">
        <div className="p-2 col-xl-6">
          <iframe
            title="4"
            className="thumb-image mr-4"
            width="100%"
            height="518"
            src="https://www.youtube.com/embed/vwkwrdwj7Mk?list=PLz8ZQShTztXE4CigCnagXlrxYn3JzfSkw"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;
            picture-in-picture"
            allowFullScreen=""
          ></iframe>
        </div>
        <div className="p-2 col-xl-6">
          <div className="row p-3 justify-content-center justify-content-xl-start">
            <p className="text-1">{t("landing.content_1")}</p>
            <div className="row double-btns justify-content-center">
              <div className="col-xl-6">
                <LimeButton onClick={() => navigate("/register")}>
                  {t("landing.iam_student")}
                </LimeButton>
              </div>
              <div className="col-xl-6">
                <GreyButton onClick={() => navigate("/register")}>
                  {t("landing.iam_teacher")}
                </GreyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
