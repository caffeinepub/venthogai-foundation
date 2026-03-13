import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Persistent IDs for stories and comments
  var currentStoryId = 0;
  var currentCommentId = 0;
  var currentVolunteerApplicationId = 0;

  // Data Structures
  type Story = {
    id : Int;
    title : Text;
    content : Text;
    authorName : Text;
    timestamp : Time.Time;
  };

  type Comment = {
    id : Int;
    storyId : Int;
    content : Text;
    authorName : Text;
    timestamp : Time.Time;
  };

  type VolunteerApplication = {
    name : Text;
    email : Text;
    phone : Text;
    areaOfExpertise : Text;
    motivation : Text;
    timestamp : Time.Time;
  };

  public type UserProfile = {
    name : Text;
  };

  module Story {
    public func compare(story1 : Story, story2 : Story) : Order.Order {
      Int.compare(story1.id, story2.id);
    };
  };

  module Comment {
    public func compare(comment1 : Comment, comment2 : Comment) : Order.Order {
      Int.compare(comment1.id, comment2.id);
    };
  };

  // Storage
  let stories = Map.empty<Int, Story>();
  let comments = Map.empty<Int, Comment>();
  let volunteerApplications = Map.empty<Int, VolunteerApplication>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Stories
  public shared ({ caller }) func postStory(title : Text, content : Text, authorName : Text) : async Int {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can post stories");
    };

    let storyId = currentStoryId;
    currentStoryId += 1;

    let story : Story = {
      id = storyId;
      title;
      content;
      authorName;
      timestamp = Time.now();
    };

    stories.add(storyId, story);
    storyId;
  };

  public query func getAllStories() : async [Story] {
    stories.values().toArray().sort();
  };

  public shared ({ caller }) func deleteStory(storyId : Int) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete stories");
    };
    if (not stories.containsKey(storyId)) {
      Runtime.trap("Story does not exist");
    };
    stories.remove(storyId);
  };

  // Comments
  public func postComment(storyId : Int, content : Text, authorName : Text) : async Int {
    if (not stories.containsKey(storyId)) {
      Runtime.trap("Cannot comment on a nonexistent story");
    };

    let commentId = currentCommentId;
    currentCommentId += 1;

    let comment : Comment = {
      id = commentId;
      storyId;
      content;
      authorName;
      timestamp = Time.now();
    };

    comments.add(commentId, comment);
    commentId;
  };

  public query func getCommentsByStory(storyId : Int) : async [Comment] {
    comments.values().filter(func(c) { c.storyId == storyId }).toArray().sort();
  };

  public shared ({ caller }) func deleteComment(commentId : Int) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete comments");
    };
    if (not comments.containsKey(commentId)) {
      Runtime.trap("Comment does not exist");
    };
    comments.remove(commentId);
  };

  // Volunteer Applications
  public func submitVolunteerApplication(
    name : Text,
    email : Text,
    phone : Text,
    areaOfExpertise : Text,
    motivation : Text,
  ) : async () {
    let application : VolunteerApplication = {
      name;
      email;
      phone;
      areaOfExpertise;
      motivation;
      timestamp = Time.now();
    };

    volunteerApplications.add(currentVolunteerApplicationId, application);
    currentVolunteerApplicationId += 1;
  };

  public query ({ caller }) func getAllVolunteerApplications() : async [VolunteerApplication] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view volunteer applications");
    };
    volunteerApplications.values().toArray();
  };
};
