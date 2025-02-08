export const AppColors = {
  Primary: "#6AC59C",
  White: "#FFFFFF",
  PrimaryDark: "#0C564E",
  Black: "#000005",
  error: "#EC495D", //
  success: "#6CC070", //
  iconColor: "#555555", //
};

export const AppFonts = {
  LatoRegular: "Lato-Regular",
  LatoBold: "Lato-Bold",
  LatoThin: "Lato-Thin",
  LatoLight: "Lato-Light",
};

export const FirebaseContants = {
  users: 'users',
  chats: 'chats'
}

export const formateDate = (dateString, withTime) => {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // If `withTime` is true, add time formatting options
  if (withTime) {
    options.hour = "numeric";
    options.minute = "numeric";
    options.hour12 = true; // Use AM/PM format
  }

  // Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    date
  );

  return formattedDate;
};
