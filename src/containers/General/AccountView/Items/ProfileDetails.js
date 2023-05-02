import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  Table,
  CardHeader,
  Divider,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";

const useStyles = makeStyles(() => ({
  root: {},
}));

const ProfileDetails = ({ user }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root)}>
      <CardHeader title={t("profile.profile_details")} />
      <Divider />
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableBody>
              <TableRow hover>
                <TableCell>{t("profile.name")}</TableCell>
                <TableCell>{user.name}</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>{t("profile.location")}</TableCell>
                <TableCell>
                  {user.city && user.city.name}{" "}
                  {user.country && user.country.name}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>{t("profile.registered")}</TableCell>
                <TableCell>
                  {moment(user.createdAt).format("YYYY-MM-DD hh:mm A")}
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>{t("profile.last_activity")}</TableCell>
                <TableCell>
                  {moment.unix(user.lastActivity).format("YYYY-MM-DD hh:mm A")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
