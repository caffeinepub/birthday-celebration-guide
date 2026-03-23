import List "mo:core/List";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

actor {
  type ContactData = {
    name : Text;
    email : Text;
    message : Text;
  };

  var nextId = 0;
  let entries = List.empty<(Nat, ContactData)>();

  public shared ({ caller }) func submit(name : Text, email : Text, message : Text) : async () {
    if (name.trim(#char ' ').size() == 0) {
      let error = "Error: Name is mandatory!";
      Runtime.trap(error);
    };

    if (email.trim(#char ' ').size() == 0) {
      let error = "Error: Email is mandatory!";
      Runtime.trap(error);
    };

    if (message.trim(#char ' ').size() == 0) {
      let error = "Error: Message is mandatory!";
      Runtime.trap(error);
    };

    let entry : (Nat, ContactData) = (
      nextId,
      {
        name;
        email;
        message;
      },
    );

    nextId += 1;

    entries.add(entry);
  };

  public query ({ caller }) func getSubmissions() : async [ContactData] {
    entries.toArray().map(func((id, contact)) { contact });
  };
};
