import "./index.scss";
import React from "react";
import { Logo } from "components/Logo";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Capitalize } from "utils/helpers";

export const Footer = () => {
  const { t } = useTranslation();
  const { topPagesList } = useSelector((state) => state.pages);

  return (
    <footer className="sections" id="footer-sections" data-footer-sections="">
      <section
        data-test="page-section"
        data-section-theme=""
        className="page-section
          layout-engine-section
          background-width--full-bleed
          section-height--small
          content-width--wide
          horizontal-alignment--center
          vertical-alignment--middle
          "
        data-section-id="5f69b6982381782913af4583"
        data-controller="SectionWrapperController, MagicPaddingController"
        data-animation="none"
        data-controllers-bound="SectionWrapperController, MagicPaddingController"
        data-active="true"
      >
        <div className="section-background"></div>
        <div className="content-wrapper">
          <div className="content">
            <div
              className="sqs-layout sqs-grid-12 columns-12"
              data-type="page-section"
            >
              <div className="row sqs-row">
                <div className="col sqs-col-12 span-12">
                  <div className="row sqs-row">
                    <div className="col-md-6">
                      <div
                        className="sqs-block newsletter-block sqs-block-newsletter rendered p-0"
                        data-block-type="51"
                      >
                        <div className="sqs-block-content preFade fadeIn">
                          <div className="newsletter-form-wrapper newsletter-form-wrapper--layoutFloat newsletter-form-wrapper--alignLeft">
                            <form
                              className="newsletter-form"
                              data-form-id="5f69b6982381782913af4581"
                              autoComplete="on"
                              method="POST"
                            >
                              <div className="newsletter-form-header-description foot_menu row m-0">
                                <div className="col-lg-6">
                                  <ul className="b-before">
                                    <b
                                      role="button"
                                      data-toggle="collapse"
                                      data-target="#fmenu_3"
                                      aria-expanded="false"
                                      aria-controls="fmenu_3"
                                      className="collapsed"
                                    >
                                      {t("footer.for_visitor")}
                                      <i></i>
                                    </b>
                                    <li>
                                      {" "}
                                      <a className="foot_item" href="/">
                                        {t("footer.main")}
                                      </a>{" "}
                                    </li>
                                    <li>
                                      {" "}
                                      <a
                                        className="foot_item"
                                        href="/page/agreement"
                                      >
                                        {t("footer.terms_of_use")}
                                      </a>
                                    </li>
                                    <li>
                                      {" "}
                                      <a className="foot_item" href="/register">
                                        {t("footer.registration")}
                                      </a>{" "}
                                    </li>
                                  </ul>
                                </div>
                                <div className="col-lg-6">
                                  <ul className="b-before">
                                    <b
                                      role="button"
                                      data-toggle="collapse"
                                      data-target="#fmenu_2"
                                      aria-expanded="false"
                                      className="collapsed"
                                    >
                                      {t("footer.help")}
                                      <i></i>
                                    </b>
                                    <li className="foot_collapse">
                                      <a className="foot_item" href="/page/faq">
                                        {t("footer.asked_questions")}
                                      </a>
                                    </li>
                                    <li className="foot_collapse">
                                      <a
                                        className="foot_item"
                                        href="/page/trener"
                                      >
                                        {t("footer.for_trainers")}
                                      </a>
                                    </li>
                                    <li className="foot_collapse">
                                      <a
                                        className="foot_item"
                                        href="/page/contacts"
                                      >
                                        {t("footer.contacts")}
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="newsletter-form-body">
                                <div className="row-6">
                                  <div className="newsletter-form-field-wrapper email required">
                                    <label className="newsletter-form-field-label title">
                                      {t("footer.email_address")}
                                    </label>
                                    <input
                                      className="newsletter-form-field-element field-element"
                                      name="email"
                                      x-autocompletetype="email"
                                      type="text"
                                      spellCheck="false"
                                      placeholder={t("footer.email_address")}
                                    />
                                    <button
                                      className="newsletter-form-button sqs-system-button sqs-editable-button-layout sqs-editable-button-style sqs-editable-button-shape"
                                      type="submit"
                                      value="Sign Up"
                                    >
                                      <span className="newsletter-form-spinner sqs-spin light large"></span>
                                      <span className="newsletter-form-button-label">
                                        {t("footer.subscribe")}
                                      </span>
                                      <span className="newsletter-form-button-icon"></span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-end col-md-6">
                      <div className="col-xl-7 col-lg-10 col-md-12">
                        <figure className="sqs-block-image-figure intrinsic">
                          <div
                            className="image-block-wrapper footer-logo has-aspect-ratio preFade fadeIn"
                            data-animation-role="image"
                          >
                            <Logo />
                          </div>
                        </figure>
                        <div className="sqs-block-content preFade fadeIn">
                          <div className="footer_desc">
                            ChessMasterPro:
                            <br />
                            {t("footer.chess_accelerator")}
                            <br />
                            {t("footer.chess_high_technologies")}
                            <br />
                            {t("footer.chess_training")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};
