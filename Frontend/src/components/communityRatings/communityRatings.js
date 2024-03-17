import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./communityRatings.scss";
import useCustomFetch from "../../hooks/useCustomFetch";
import Fieldset from "../ui/fieldset/fieldset";
import Star from "../ui/star/star";

const CommunityRatings = ({ gameEntryId, gameReviews }) => {
  const { data, dataReady, setFetchParams, setShouldFetch, error } =
    useCustomFetch(
      `${process.env.REACT_APP_API_URL}/api/backlog/getGameReviews`,
      false
    );

  const [userGameRatings, setUserGameRatings] = useState(
    gameReviews ? gameReviews : false
  );

  useEffect(() => {
    if (!userGameRatings) {
      setFetchParams({ id: gameEntryId });
      setShouldFetch(true);
    }
  }, [userGameRatings]);

  useEffect(() => {
    if (dataReady) {
      setUserGameRatings(data);
    }
  }, [data]);

  return (
    <div className="CommunityRatings">
      {(userGameRatings.length === 0 || error) && (
        <h2>There are currently no Reviews for this game</h2>
      )}
      {userGameRatings && userGameRatings.length > 0 && (
        <div className="textReviews">
          {userGameRatings.map((rating) => {
            if (rating.review) {
              return (
                <Fieldset
                  legendText={
                    <div className="userRating">
                      {rating.userName} : {rating.starRating}
                      <Star size={10} color={"white"} full={true} />
                    </div>
                  }
                  text={rating.review}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

CommunityRatings.propTypes = {};

CommunityRatings.defaultProps = {};

export default CommunityRatings;
