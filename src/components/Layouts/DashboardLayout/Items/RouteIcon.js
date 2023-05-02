export default function RouteIcon(route) {
  switch (route) {
    case "profile":
      return "account_circle";
    case "settings":
      return "settings";
    case "chat":
      return "chat_bubble";
    case "coach":
      return "school";
    case "student":
      return "school";
    case "awards":
      return "emoji_events";
    case "problems":
      return "extension";
    case "categories":
      return "format_list_bulleted";
    case "add":
      return "add_circle";
    case "cabinet":
      return "grid_view";
    case "dashboard":
      return "dashboard";
    case "students":
      return "people";
    case "trainings":
      return "quiz";
    case "updates":
      return "announcement";
    case "play":
      return "play_circle_filled";
    case "self":
      return "model_training";
    case "accelerator":
      return "view_in_ar";
    case "upload":
      return "backup_icon";
    case "groups":
      return "people_alt";
    case "statistics":
      return "bar_chart";
    case "lobby":
      return "settings_input_component";
    case "computer":
      return "settings_input_component";
    default:
      break;
  }
}
