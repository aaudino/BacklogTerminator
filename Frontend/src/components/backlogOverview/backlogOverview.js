import React, { useContext, useEffect, useState } from "react";
import BacklogOverviewItem from "../backlogOverviewItem/backlogOverviewItem";
import Select from "../ui/select/select";
import PropTypes from "prop-types";
import "./backlogOverview.scss";
import { backlogContext } from "../../context/backlogContext";
import Counter from "../ui/counter/counter";
import Fieldset from "../ui/fieldset/fieldset";
import Slider from "../ui/slider/slider";
import SortingContainer from "../sortingContainer/sortingContainer";
import Progressbar from "../ui/progressbar/progressbar";
import useLocalStorage from "../../hooks/useLocalStorage";

const BacklogOverview = () => {
  const {
    dataReady,
    backlogEntries,
    terminatedGames,
    terminatedGamesDataReady,
  } = useContext(backlogContext);
  const [showItems, setShowItems] = useState("Backlog");

  const BacklogOptionCaptions = {
    alreadyPlayedCB: {
      categoryCaption: "Currently Playing",
      answerMapping: { true: "Currently Playing", false: "Backloged" },
    },
    platformSelect: { categoryCaption: "Platform" },
    playstyleSelect: { categoryCaption: "Playstyle" },
  };

  const TerminatedOptionCaptions = {
    platformSelect: { categoryCaption: "Platform" },
    playstyleSelect: { categoryCaption: "Playstyle" },
  };

  const { getLSValue: getBacklogSortingLSValue } =
    useLocalStorage("backlogSorting");

  const { getLSValue: getBeatenSortingLSValue } =
    useLocalStorage("beatenSorting");

  return (
    <div className="BacklogOverview">
      <Slider
        stateFunction={setShowItems}
        items={["Backlog", "Beaten"]}
      ></Slider>
      {dataReady === true && showItems === "Backlog" && (
        <>
          <SortingContainer
            noSortingValue={"No Sorting"}
            defaultValue={getBacklogSortingLSValue() || "No Sorting"}
            captions={BacklogOptionCaptions}
            itemsToSort={backlogEntries}
            lsKey={"backlogSorting"}
          >
            <Counter
              itemsToCount={backlogEntries.length}
              statement={"Games to Terminate"}
            />
          </SortingContainer>
        </>
      )}
      {terminatedGamesDataReady && showItems === "Beaten" && (
        <>
          <Progressbar
            referenceObject={backlogEntries}
            object={terminatedGames}
          ></Progressbar>
          <SortingContainer
            noSortingValue={"No Sorting"}
            defaultValue={getBeatenSortingLSValue() || "No Sorting"}
            captions={TerminatedOptionCaptions}
            itemsToSort={terminatedGames}
            lsKey={"beatenSorting"}
          >
            <Counter
              itemsToCount={terminatedGames.length}
              statement={"Games Terminated"}
            />
          </SortingContainer>
        </>
      )}
    </div>
  );
};

BacklogOverview.propTypes = {};

BacklogOverview.defaultProps = {};

export default BacklogOverview;
