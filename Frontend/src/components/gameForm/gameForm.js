import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import "./gameForm.scss";
import useCustomPost from "../../hooks/useCustomPost";
import { backlogContext } from "../../context/backlogContext";
import GameFormHeader from "../gameFormHeader/gameFormHeader";
import Slider from "../ui/slider/slider";
import Button from "../ui/button/button";
import GameEntryForm from "../gameEntryForm/gameEntryForm";
import getGameplayTimes from "../../utils/getGameplayTimes";
import UserRating from "../userRating/userRating";
import CommunityRatings from "../communityRatings/communityRatings";

//TODO: check how to preserve the values of the  components that are used in the Game and Community tab acroos rerenders.

const GameForm = ({
  saveUrl,
  deleteUrl,
  setIsModalOpen,
  gameEntry,
  userData,
}) => {
  const { setShouldFetchBacklogeEntries, setShouldFetchTerminatedGames } =
    useContext(backlogContext);

  const [formError, setFormError] = useState(true);
  const [modifiedGameEntry, setModifiedGameEntry] = useState(gameEntry);
  const [dataReady, setdataReady] = useState(false);
  const [showItems, setShowItems] = useState("Game");
  const [formChanges, setFormChanges] = useState();
  const [reviewChanges, setReviewChanges] = useState();

  const formRef = useRef();

  const userFormData = useMemo(() => {
    if (formChanges) {
      const checkboxNames = ["alreadyPlayedCB", "completedGame"];
      const formData = new FormData(formRef.current);
      const formDataEntries = Object.fromEntries(formData.entries());

      checkboxNames.forEach((name) => {
        const value = formDataEntries[name];

        !value
          ? (formDataEntries[name] = false)
          : (formDataEntries[name] = true);
      });

      if (formDataEntries.completedGame === true) {
        formDataEntries.alreadyPlayedCB = false;
        delete formDataEntries.hoursPlayed;
      }

      return formDataEntries;
    } else {
      return userData;
    }
  }, [formChanges, userData]);

  const userReviewData = useMemo(() => {
    if (reviewChanges) {
      return { ...reviewChanges, completedGame: userFormData?.completedGame };
    } else {
      return {
        starRating: userData?.starRating,
        review: userData?.review,
        completedGame: userFormData?.completedGame,
        shareWithCommunity: userData?.shareWithCommunity,
      };
    }
  }, [reviewChanges]);

  const {
    setBodyData: setSaveData,
    postSuccess: postSaveSuccess,
    error: saveError,
  } = useCustomPost(saveUrl);

  const {
    setBodyData: setDeleteData,
    postSuccess: postDeleteSuccess,
    error: deleteError,
  } = useCustomPost(deleteUrl);

  useEffect(() => {
    if (postSaveSuccess || postDeleteSuccess) {
      setIsModalOpen(false);
      setShouldFetchBacklogeEntries(true);
      setShouldFetchTerminatedGames(true);
    }
  }, [postSaveSuccess, postDeleteSuccess]);

  useEffect(() => {
    const gameplayStyles = getGameplayTimes(modifiedGameEntry);

    setModifiedGameEntry((prev) => ({ ...prev, gameplayStyles }));
    setdataReady(true);
  }, []);

  function handleFormChange(event) {
    setFormChanges(Date.now()); // Using functional update to ensure it's always incremented);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!userFormData.completedGame) {
      userReviewData.shareWithCommunity = false;
    }

    delete userFormData.backlogItem;

    userReviewData.completedGame = userFormData.completedGame;
    const userFormAndReviewData = {
      ...userFormData,
      ...userReviewData,
    };
    setSaveData({
      game: modifiedGameEntry,
      user: { gameInfo: userFormAndReviewData },
    });
  }

  async function handleDelete(event) {
    event.preventDefault();
    setDeleteData({ backlogItemId: gameEntry._id });
  }

  return (
    <>
      {dataReady && (
        <div className="GameForm">
          <GameFormHeader game={modifiedGameEntry} />

          <Slider stateFunction={setShowItems} items={["Game", "Community"]} />

          {showItems === "Game" && (
            <>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                onChange={handleFormChange}
              >
                <GameEntryForm
                  formError={formError}
                  setFormError={setFormError}
                  gameEntry={modifiedGameEntry}
                  userData={userFormData}
                />
              </form>
            </>
          )}

          {showItems === "Community" && (
            <>
              <div className="communityTabContainer">
                <UserRating
                  storeReview={setReviewChanges}
                  userReviewData={userReviewData}
                />
                <CommunityRatings
                  gameEntryId={gameEntry.id}
                  gameReviews={gameEntry.reviews}
                />
              </div>
            </>
          )}

          <div className="buttonContainer">
            <Button
              style={!formError ? "btn-disabled" : "btn-primary"}
              disabler={!formError}
              clickHandler={handleSubmit}
              btnText="Save"
            />
            {userData && (
              <Button
                clickHandler={handleDelete}
                style={"btn-delete"}
                btnText={"Delete"}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

GameForm.propTypes = {};

GameForm.defaultProps = {};

export default GameForm;
