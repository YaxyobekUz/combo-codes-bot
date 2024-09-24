const parseMarkdown = { parse_mode: "Markdown" };

const formatUsername = (username) => {
  if (typeof username === "string" && username.length >= 4) {
    const value = username.trim().toLowerCase();
    const hasAt = value[0] === "@";

    const usernameModel = {
      text: hasAt ? value.slice(1) : value,
      username: hasAt ? value : "@" + value,
    };

    // returning the usernameModel instead of an empty object
    return usernameModel;
  } else {
    return null;
  }
};

const formatMsg = (title, description) => `*${title}*\n\n${description}`;

module.exports = { formatUsername, formatMsg, parseMarkdown };
