import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

export default function TermsDialog(props) {
  const { open, handleToggle } = props;
  const [maxWidth] = useState("md");

  return (
    <>
      <Dialog
        maxWidth={maxWidth}
        open={open}
        onClose={handleToggle}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle disableTypography id="max-width-dialog-title">
          <Typography variant="h2" gutterBottom>
            ОБЩИЕ ПРАВИЛА НА САЙТЕ
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h4" gutterBottom>
            Общие правила поведения на сайте:
          </Typography>
          <Typography variant="body2" gutterBottom>
            Начнем с того, что на сайте общаются сотни людей, разных религий и
            взглядов, и все они являются полноправными посетителями нашего
            сайта, поэтому если мы хотим чтобы это сообщество людей
            функционировало нам и необходимы правила. Мы настоятельно
            рекомендуем прочитать настоящие правила, это займет у вас всего
            минут пять, но сбережет нам и вам время и поможет сделать сайт более
            интересным и организованным.
          </Typography>
          <br />
          <Typography variant="body2" gutterBottom>
            Начнем с того, что на нашем сайте нужно вести себя уважительно ко
            всем посетителям сайта. Не надо оскорблений по отношению к
            участникам, это всегда лишнее. Если есть претензии - обращайтесь к
            Админам или Модераторам (воспользуйтесь личными сообщениями).
            Оскорбление других посетителей считается у нас одним из самых тяжких
            нарушений и строго наказывается администрацией.{" "}
            <b>
              У нас строго запрещен расизм, религиозные и политические
              высказывания.
            </b>{" "}
            Заранее благодарим вас за понимание и за желание сделать наш сайт
            более вежливым и дружелюбным.
          </Typography>
          <br />
          <Typography variant="h4" gutterBottom>
            На сайте строго запрещено:
          </Typography>
          <Typography variant="body2" gutterBottom>
            - сообщения, не относящиеся к содержанию статьи или к контексту
            обсуждения
            <br />
            - оскорбление и угрозы в адрес посетителей сайта
            <br />
            - в комментариях запрещаются выражения, содержащие ненормативную
            лексику, унижающие человеческое достоинство, разжигающие
            межнациональную рознь
            <br />
            - спам, а также реклама любых товаров и услуг, иных ресурсов, СМИ
            или событий, не относящихся к контексту обсуждения статьи
            <br />
            <br />
            Давайте будем уважать друг друга и сайт, на который Вы и другие
            читатели приходят пообщаться и высказать свои мысли. Администрация
            сайта оставляет за собой право удалять комментарии или часть
            комментариев, если они не соответствуют данным требованиям.
            <br />
            <br />
            При нарушении правил вам может быть дано <b>предупреждение</b>. В
            некоторых случаях может быть дан бан <b>без предупреждений</b>. По
            вопросам снятия бана писать администратору.
            <br />
            <br />
            <b>Оскорбление</b> администраторов или модераторов также караются{" "}
            <b>баном</b> - уважайте чужой труд.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggle} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
