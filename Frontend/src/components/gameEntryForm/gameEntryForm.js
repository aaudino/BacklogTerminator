import React from "react";
import PropTypes from "prop-types";
import "./gameEntryForm.scss";
import { useEffect, useState, useReducer } from "react";
import Select from "../ui/select/select";
import Checkbox from "../ui/checkbox/checkbox";
import Input from "../ui/input/input";
import Fieldset from "../ui/fieldset/fieldset";
import getGameplayTimes from "../../utils/getGameplayTimes";

const GameEntryForm = ({
  gameEntry,
  performDataProcessing,
  userData = false,
  formError,
  setFormError,
}) => {
  const {
    alreadyPlayedCB: currentlyPlaying,
    completedGame,
    hoursPlayed: playtime,
    platformSelect: platform,
    playstyleSelect: playstyle,
  } = userData;
  const [localGameEntry, setLocalGameEntry] = useState(gameEntry);

  const initialState = {
    checkboxIsChecked: false,
    gameIsCompleted: false,
    playtime: { value: null, invalid: false },
    platform: { value: null, invalid: true },
    playstyle: { value: null, invalid: true },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "platform_selected":
        return { ...state, platform: action.payload };
      case "playstyle_selected":
        return { ...state, playstyle: action.payload };
      case "checkbox_clicked":
        return {
          ...state,
          checkboxIsChecked: action.payload,
          playtime: { invalid: action.payload, value: null },
        };
      case "hours_specified":
        return { ...state, playtime: action.payload };
      case "game_completed":
        return {
          ...state,
          playtime: {
            invalid:
              state.playtime.value > 0 ||
              state.playtime.value === null ||
              action.payload === true
                ? false
                : true,
            value: action.payload === true ? 0 : state.playtime.value,
          },
          gameIsCompleted: action.payload,
          checkboxIsChecked:
            action.payload === true ? false : state.checkboxIsChecked,
        };
      default:
        break;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const allInputsAreValid = Object.values(state).every(
      (prop) => !prop.invalid
    );
    if (allInputsAreValid !== formError) {
      setFormError(allInputsAreValid);
    }
  }, [state, setFormError, formError]);

  return (
    <>
      <div className="backlogModal">
        <Fieldset legendText="Summary" text={localGameEntry.description} />
        <div className="userInput">
          {state.gameIsCompleted === false && (
            <Checkbox
              name={"alreadyPlayedCB"}
              labelText={"Currently Playing"}
              dispatcher={dispatch}
              command={"checkbox_clicked"}
              providedValue={currentlyPlaying}
            />
          )}
          {state.checkboxIsChecked && (
            <Input
              name={"hoursPlayed"}
              labelText={"Hours Played"}
              type={"number"}
              dispatcher={dispatch}
              command={"hours_specified"}
              validatorRegex={/^(?!0+(\.0+)?$)\d+(\.\d+)?$/}
              providedValue={playtime}
              disabler={state.gameIsCompleted}
            />
          )}

          <Select
            name={"playstyleSelect"}
            labelText={"Playstyle"}
            options={Object.keys(localGameEntry.gameplayStyles)}
            dispatcher={dispatch}
            command={"playstyle_selected"}
            placeholder={"Choose your Playstyle"}
            providedValue={playstyle}
          />
          <Select
            name={"platformSelect"}
            labelText={"Platform"}
            options={localGameEntry.platforms}
            dispatcher={dispatch}
            command={"platform_selected"}
            placeholder={"Choose your Platform"}
            providedValue={platform}
          />

          <Checkbox
            name={"completedGame"}
            labelText={"Terminated"}
            dispatcher={dispatch}
            command={"game_completed"}
            providedValue={completedGame}
          />
        </div>
      </div>
    </>
  );
};

GameEntryForm.propTypes = {};

GameEntryForm.defaultProps = {};

export default GameEntryForm;
