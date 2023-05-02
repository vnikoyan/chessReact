import "./index.scss";
import React from "react";
import { GreyButton } from "components/Buttons/GreyButton";
import { useTranslation } from "react-i18next";

export const Tariffs = () => {
  const { t } = useTranslation();

  return (
    <div className="content-wrapper-5 vw-100">
      <div className="content">
        <div className="layout grid-12 columns-12" data-type="page-section">
          <div className="title text-align-center pt-5">
            <h2 className="preFade fadeIn">{t("landing.tariffs")}</h2>
          </div>
          <div className="row p-3 p-lg-5">
            <div className="col col-4 span-4">
              <div className="block image-block block-image text-ready">
                <div className="block-content">
                  <a href="https://masterclass.worldchess.com/subscribe/p/monthly-subscription">
                    <div
                      className="image-block-wrapper has-aspect-ratio preFade fadeIn"
                      data-animation-role="image"
                    >
                      <img
                        src="https://images.squarespace-cdn.com/content/v1/5f4758487e62a03994bcef63/1600093780226-072G0Q5DMI82ATLR171D/ke17ZwdGBToddI8pDm48kDiJWEu_tfmM-Jhuu4K0XO1Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIjyLvSbCwBsEf3OLOgyVbakufl-OIMR0hRyJW56FO6NE/monthly_plan.png"
                        alt="monthly_plan.png"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className="block html-block block-html">
                <p className="preFade fadeIn tariff-price">
                  <a href="https://masterclass.worldchess.com/subscribe/p/library-access">
                    350{t("landing.price_per_month")}{" "}
                  </a>
                </p>
                <div className="tariff-details">
                  <p className="preFade fadeIn">{t("landing.full_access")}:</p>
                  <p className="preFade fadeIn">
                    — {t("landing.tariff1_1")} <br />— {t("landing.tariff1_2")}{" "}
                    <br />— {t("landing.tariff1_3")} <br />—{" "}
                    {t("landing.tariff1_4")}
                  </p>
                </div>
              </div>
              <div className="block button-block block-button">
                <div className="block-content d-flex justify-content-center">
                  <div
                    className="block-button-container--center preFade fadeIn buy-button"
                    data-animation-role="button"
                    data-alignment="center"
                    data-button-size="medium"
                  >
                    <GreyButton>{t("landing.buy")}</GreyButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-4 span-4">
              <div className="block image-block block-image text-ready">
                <div className="block-content">
                  <a href="https://masterclass.worldchess.com/subscribe/p/monthly-subscription">
                    <div
                      className="image-block-wrapper has-aspect-ratio preFade fadeIn"
                      data-animation-role="image"
                    >
                      <img
                        src="https://images.squarespace-cdn.com/content/v1/5f4758487e62a03994bcef63/1600093780226-072G0Q5DMI82ATLR171D/ke17ZwdGBToddI8pDm48kDiJWEu_tfmM-Jhuu4K0XO1Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIjyLvSbCwBsEf3OLOgyVbakufl-OIMR0hRyJW56FO6NE/monthly_plan.png"
                        alt="monthly_plan.png"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className="block html-block block-html">
                <p className="preFade fadeIn tariff-price">
                  <a href="https://masterclass.worldchess.com/subscribe/p/library-access">
                    350{t("landing.price_per_month")}{" "}
                  </a>
                </p>
                <div className="tariff-details">
                  <p className="preFade fadeIn">{t("landing.full_access")}:</p>
                  <p className="preFade fadeIn">
                    — {t("landing.tariff1_1")} <br />— {t("landing.tariff1_2")}{" "}
                    <br />— {t("landing.tariff1_3")} <br />—{" "}
                    {t("landing.tariff1_4")}
                  </p>
                </div>
              </div>
              <div
                className="block button-block block-button"
                id="block-fae6f10cf62baee82bd6"
              >
                <div className="block-content d-flex justify-content-center">
                  <div
                    className="block-button-container--center preFade fadeIn buy-button"
                    data-animation-role="button"
                    data-alignment="center"
                    data-button-size="medium"
                  >
                    <GreyButton>{t("landing.buy")}</GreyButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-4 span-4">
              <div className="block image-block block-image text-ready">
                <div className="block-content">
                  <a href="https://masterclass.worldchess.com/subscribe/p/monthly-subscription">
                    <div
                      className="image-block-wrapper has-aspect-ratio preFade fadeIn"
                      data-animation-role="image"
                    >
                      <img
                        src="https://images.squarespace-cdn.com/content/v1/5f4758487e62a03994bcef63/1600093780226-072G0Q5DMI82ATLR171D/ke17ZwdGBToddI8pDm48kDiJWEu_tfmM-Jhuu4K0XO1Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIjyLvSbCwBsEf3OLOgyVbakufl-OIMR0hRyJW56FO6NE/monthly_plan.png"
                        alt="monthly_plan.png"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div className="block html-block block-html">
                <p className="preFade fadeIn tariff-price">
                  <a href="https://masterclass.worldchess.com/subscribe/p/library-access">
                    1500{t("landing.price_per_month")}{" "}
                  </a>
                </p>
                <div className="tariff-details">
                  <p className="preFade fadeIn">{t("landing.full_access")}:</p>
                  <p className="preFade fadeIn">
                    — {t("landing.tariff1_1")} <br />— {t("landing.tariff1_2")}{" "}
                    <br />— {t("landing.tariff1_3")} <br />—{" "}
                    {t("landing.tariff1_4")}
                  </p>
                </div>
              </div>
              <div
                className="block button-block block-button"
                id="block-fae6f10cf62baee82bd6"
              >
                <div className="block-content d-flex justify-content-center">
                  <div
                    className="block-button-container--center preFade fadeIn buy-button"
                    data-animation-role="button"
                    data-alignment="center"
                    data-button-size="medium"
                  >
                    <GreyButton>{t("landing.buy")}</GreyButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
