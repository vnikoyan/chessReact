import "./index.scss";
import React from "react";
import { useTranslation } from "react-i18next";

export const Grossmeisters = () => {
  const { t } = useTranslation();

  return (
    <div className="content-wrapper-3 vw-100">
      <div className="content">
        <div
          className="layout grid-12 columns-12"
          data-type="page-section"
          id="page-section-5fbe26af08845d092453d5b6"
        >
          <div className="title text-align-center py-5 p-3">
            <h2 className="preFade fadeIn">
              {t("landing.learn_chess_etc")}
              <br />
              {t("landing.best_grandmasters_etc")}
            </h2>
          </div>
          <div className="row p-3 p-lg-5">
            <div className="col-md-4 col-xs-12 span-4">
              <div
                className="block image-block block-image"
                id="block-yui_3_17_2_1_1606916720672_13758"
              >
                <div className="block-content">
                  <figure
                    className="block-image-figure image-block-outer-wrapper image-block-v2 design-layout-stack combination-animation-none individual-animation-none individual-text-animation-none image-position-left text-ready"
                    data-scrolled=""
                    data-test="image-block-v2-outer-wrapper"
                    id="yui_3_17_2_1_1613735266296_204"
                  >
                    <div className="intrinsic">
                      <div
                        className="image-inset content-fit preFade fadeIn"
                        data-animation-role="image"
                        data-description=""
                      >
                        <iframe
                          title="1"
                          className="thumb-image"
                          width="500"
                          height="500"
                          src="https://www.youtube.com/embed/hTerqNkSepQ"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen=""
                        ></iframe>
                      </div>
                    </div>
                  </figure>
                </div>
              </div>
              <div className="block">
                <div className="block-content">
                  <p className="name my-4">{t("landing.teimour_radjabov")}</p>
                  <h4 className="status my-4">
                    {t("landing.teimour_radjabov_title")}
                  </h4>
                  <p className="desc">{t("landing.teimour_radjabov_desc1")}</p>
                  <p className="desc">{t("landing.teimour_radjabov_desc2")}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xs-12 span-4">
              <div className="block image-block block-image">
                <div className="block-content">
                  <figure
                    className="block-image-figure image-block-outer-wrapper image-block-v2 design-layout-stack combination-animation-none individual-animation-none individual-text-animation-none image-position-left text-ready"
                    data-scrolled=""
                    data-test="image-block-v2-outer-wrapper"
                    id="yui_3_17_2_1_1613735266296_204"
                  >
                    <div className="intrinsic">
                      <div
                        className="image-inset content-fit preFade fadeIn"
                        data-animation-role="image"
                        data-description=""
                      >
                        <iframe
                          title="2"
                          className="thumb-image"
                          width="500"
                          height="500"
                          src="https://www.youtube.com/embed/YE_1SnhCQ6M"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen=""
                        ></iframe>
                      </div>
                    </div>
                    <div className="block">
                      <div className="block-content">
                        <p className="name my-4">{t("landing.daniil_dubov")}</p>
                        <h4 className="status my-4">
                          {t("landing.daniil_dubov_title")}
                        </h4>
                        <p className="desc">
                          {t("landing.daniil_dubov_desc1")}
                        </p>
                        <p className="desc">
                          {t("landing.daniil_dubov_desc2")}
                        </p>
                      </div>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xs-12 span-4">
              <div className="block image-block block-image">
                <div className="block-content">
                  <figure
                    className="block-image-figure image-block-outer-wrapper image-block-v2 design-layout-stack combination-animation-site-default individual-animation-none individual-text-animation-none image-position-left text-ready animation-loaded"
                    data-scrolled=""
                    data-test="image-block-v2-outer-wrapper"
                    id="yui_3_17_2_1_1613735266296_206"
                  >
                    <div className="intrinsic">
                      <div
                        className="image-inset content-fit preFade fadeIn"
                        data-animation-role="image"
                        data-description=""
                      >
                        <iframe
                          title="3"
                          className="thumb-image"
                          width="500"
                          height="500"
                          src="https://www.youtube.com/embed/9Okl-0s1eqg"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen=""
                        ></iframe>
                      </div>
                    </div>
                    <div className="block">
                      <div className="block-content">
                        <p className="name my-4">
                          {t("landing.peter_svidler")}
                        </p>
                        <h4 className="status my-4">
                          {t("landing.peter_svidler_title")}
                        </h4>
                        <p className="desc">
                          {t("landing.peter_svidler_desc1")}
                        </p>
                        <p className="desc">
                          {t("landing.peter_svidler_desc2")}
                        </p>
                      </div>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
