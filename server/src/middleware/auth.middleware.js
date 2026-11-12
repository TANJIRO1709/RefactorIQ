import { Octokit } from "@octokit/rest";
import User from "../models/User.js";

// The client signs in with GitHub via next-auth and sends the GitHub access token.
// We verify it by asking GitHub who it belongs to, then upsert the user.
const protect = async (req, res, next) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please sign in with GitHub first",
    });
  }

  try {
    const { data: gh } = await new Octokit({ auth: token }).users.getAuthenticated();

    req.user = await User.findOneAndUpdate(
      { githubId: String(gh.id) },
      { username: gh.login, avatar: gh.avatar_url, email: gh.email },
      { upsert: true, new: true }
    );
    req.githubToken = token;

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Session expired, please sign in again",
    });
  }
};

export default protect;
