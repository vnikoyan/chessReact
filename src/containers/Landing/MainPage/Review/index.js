import "./index.scss";
import React from "react";
import { useTranslation } from "react-i18next";

export const Review = () => {
  const { t } = useTranslation();

  return (
    <div className="content-wrapper-4 vw-100">
      <div className="content pt-5">
        <div
          className="layout grid-12 columns-12"
          data-type="page-section"
          id="page-section-5fbe26af08845d092453d5b6"
        >
          <div className="title text-align-center">
            <h2 className="preFade fadeIn mt-5">{t("landing.reviews")}</h2>
          </div>
          <div className="row p-3 p-lg-5">
            <div className="col-md-6 col-xs-12 text-align-center">
              <p className="sqsrte-large preFade fadeIn">
                {t("landing.review1")}
              </p>
              <p className="preFade fadeIn">— {t("landing.review1_about")}</p>
            </div>
            <div className="col-md-6 col-xs-12 text-align-center">
              <p className="sqsrte-large preFade fadeIn">
                {t("landing.review2")}
              </p>
              <p className="preFade fadeIn">— {t("landing.review2_about")}</p>
            </div>
          </div>
          <div className="row p-3 p-lg-5">
            <div className="col-md-6 col-xs-12 text-align-center">
              <p className="sqsrte-large preFade fadeIn">
                {t("landing.review3")}
              </p>
              <p className="preFade fadeIn">— {t("landing.review3_about")}</p>
            </div>
            <div className="col-md-6 col-xs-12 text-align-center">
              <p className="sqsrte-large preFade fadeIn">
                {t("landing.review4")}
              </p>
              <p className="preFade fadeIn">— {t("landing.review4_about")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
