import "./index.scss";
import React from "react";
import { LimeButton } from "components/Buttons/LimeButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const ContentMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="content-main vw-100 p-3">
      <div className="d-flex flex-column content-wrapper align-items-center justify-content-center">
        <div className="p-2 text-align-center">
          <h2>{t("landing.professional_coaches_etc")}</h2>
        </div>
        <div className="p-2">
          <div>
            <LimeButton
              onClick={() =>
                navigate(
                  "/page/mastera-mezhdunarodnye-grossmejstery-i-shahmatnye-shkoly-professionalnye-trenera"
                )
              }
            >
              {t("landing.show_more")}
            </LimeButton>
          </div>
        </div>
      </div>
    </div>
  );
};
