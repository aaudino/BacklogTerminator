import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./userRating.scss";
import StarRating from "../starRating/starRating";
import Checkbox from "../ui/checkbox/checkbox";

const UserRating = ({ userReviewData, storeReview }) => {
  const { starRating, review, completedGame } = userReviewData;
  const [userRating, setUserRating] = useState(starRating);
  const [userComment, setUserComment] = useState(review);
  const [shareWithCommunity, setShareWithCommunity] = useState(false);
  useEffect(() => {
    storeReview({
      starRating: userRating,
      review: userComment,
      shareWithCommunity: shareWithCommunity,
    });
  }, [userRating, userComment, shareWithCommunity]);

  return (
    <div className="UserRating">
      <p>How would you rate this Game?</p>
      <StarRating
        onSetRating={setUserRating}
        color="#5c16c5"
        maxRating={5}
        size={32}
        defaultRating={starRating || 0}
      />
      <p className="commentLabel">Comment:</p>
      <textarea
        value={userComment || ""}
        onInput={(event) => setUserComment(event.target.value)}
      ></textarea>

      {userRating && (
        <Checkbox
          stateFunction={setShareWithCommunity}
          disabler={!completedGame}
          providedValue={userReviewData.shareWithCommunity}
          labelText={
            completedGame
              ? "Want to share your Review?"
              : "Terminate the game to unlock sharing"
          }
        />
      )}
    </div>
  );
};

UserRating.propTypes = {};

UserRating.defaultProps = {};

export default UserRating;
