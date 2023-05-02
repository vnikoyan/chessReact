import { useEffect, useState } from "react";
import { Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import i18next from "i18next";
import cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  select: {
    "&:before": {
      border: "none",
    },
    "&:after": {
      border: "none",
    },
    "&:hover": {
      border: "none",
    },
  },
}));

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "ru",
    name: "Русский",
    country_code: "ru",
  },
  {
    code: "zh",
    name: "中國人",
    country_code: "cn",
  },
];

export default function LanguageSelect() {
  const classes = useStyles();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const [lang, setLang] = useState(currentLanguageCode);

  const handleChangeLanguage = ({ target }) => {
    setLang(target.value);
    i18next.changeLanguage(target.value);
    window.location.reload();
  };

  return (
    <Select
      value={lang}
      className={classes.select}
      onChange={handleChangeLanguage}
    >
      {languages.map(({ code, name, country_code }) => (
        <MenuItem key={country_code} value={code}>
          <span className={`flag-icon flag-icon-${country_code} mx-2`}></span>
          {name}
        </MenuItem>
      ))}
    </Select>
  );
}
