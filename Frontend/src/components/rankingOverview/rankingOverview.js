import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./rankingOverview.scss";
import { backlogContext } from "../../context/backlogContext";
import RankingOverviewItem from "../rankingOverviewItem/rankingOverviewItem";

const RankingOverview = () => {
  const { dataReady, backlogEntries } = useContext(backlogContext);
  const [rankingDone, setRankingDone] = useState(false);

  useEffect(() => {
    if (backlogEntries) {
      createGameRanking(backlogEntries);
      setRankingDone(true);
    }
  }, [dataReady]);

  const createGameRanking = (backlogGames) => {
    const scoreWeight = 0.55;
    const playtimeWeight = 1 - scoreWeight;
    const playtimeThreshold = 20;
    const penalityScalingFactor = 0.5;
    const rewardScalingFactor = 10;

    backlogGames.forEach((game) => {
      const rating = game.backlogItem.rating;
      console.log(game.hoursPlayed);
      const hoursToBeat =
        game.backlogItem.gameplayStyles[game.playstyleSelect] -
        (game.hoursPlayed || 0);
      let penalty = 0;
      let reward = 0;
      let normalizedPlaytime = hoursToBeat / playtimeThreshold;
      let terminatorScore;

      if (normalizedPlaytime > 1) {
        const excessTime = hoursToBeat - playtimeThreshold;
        penalty = excessTime * penalityScalingFactor;

        terminatorScore = scoreWeight * rating - playtimeWeight * penalty;
        // console.log(
        //   "penalized:",
        //   game.backlogItem.name,
        //   penalty,
        //   rating,
        //   hoursToBeat
        // );
      } else {
        reward = (1 - normalizedPlaytime) * rewardScalingFactor;
        terminatorScore = scoreWeight * rating + playtimeWeight * reward;

        // console.log(
        //   "rewarded:",
        //   game.backlogItem.name,
        //   reward,
        //   rating,
        //   hoursToBeat
        // );
      }

      game.terminatorScore = Number(terminatorScore.toFixed(4));
      game.hoursToBeat = hoursToBeat;
    });

    backlogGames.sort((a, b) => b.terminatorScore - a.terminatorScore);
  };

  return (
    <div className="rankingOverview">
      {dataReady &&
        rankingDone &&
        backlogEntries.map((entry, index) => (
          <RankingOverviewItem gameEntry={entry} index={index} />
        ))}
    </div>
  );
};

RankingOverview.propTypes = {};

RankingOverview.defaultProps = {};

export default RankingOverview;
