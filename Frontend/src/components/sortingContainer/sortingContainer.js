import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./sortingContainer.scss";
import keyValuePairs from "../../utils/keyValuePairs";
import Select from "../ui/select/select";
import Fieldset from "../ui/fieldset/fieldset";
import BacklogOverviewItem from "../backlogOverviewItem/backlogOverviewItem";

const SortingContainer = ({
  captions,
  itemsToSort,
  defaultValue = "No Sorting",
  noSortingValue = "No Sorting",
  children,
}) => {
  const [categorizationOptions, setCategorizationOptions] = useState({});
  const [categorizationChoice, setCategorizationChoice] = useState(null);
  const selectRef = useRef(null);

  let test = keyValuePairs(captions, "categoryCaption");
  test = { [noSortingValue]: noSortingValue, ...test };

  useEffect(() => {
    // 1. Iterate through all items and check all of their properties and whether they are mentioned in the captions Object
    itemsToSort.forEach((element) => {
      for (let [propertyKey, propertyValue] of Object.entries(element)) {
        if (!captions.hasOwnProperty(propertyKey)) {
          continue;
        }
        //2. If so convert their values to a string
        //   which is needed  for converting booleans to strings since booleans are not iterable
        propertyValue = propertyValue.toString();
        let captionEntry = captions[propertyKey];

        // 3. gather all of the possible values in the values Array,
        //    If it was iterated for the first time create a new array
        //    otherwise set is used and transformed back to an array for avoiding duplicates
        if (captionEntry.sortingValues === undefined) {
          captionEntry.sortingValues = [propertyValue];
        } else {
          captionEntry.sortingValues = Array.from(
            new Set([...captionEntry.sortingValues, propertyValue])
          );
        }
      }
      setCategorizationOptions(captions);
    });
  }, [itemsToSort, categorizationChoice]);

  useEffect(() => {
    handleCategorization(selectRef.current.propValue);
  }, [categorizationOptions]);

  const handleCategorization = (eventValue) => {
    if (eventValue === noSortingValue) {
      setCategorizationChoice(false);
    } else {
      setCategorizationChoice({
        propertyName: eventValue,
        ...categorizationOptions[eventValue],
      });
    }
  };

  return (
    <>
      <div className="infoContainer">
        <Select
          ref={selectRef}
          providedValue={defaultValue || noSortingValue}
          options={test}
          stateFunction={handleCategorization}
        ></Select>
        {children}
      </div>

      <>
        {categorizationChoice ? (
          <>
            {categorizationChoice.sortingValues.map((value) => {
              let legendtext = value;
              if (categorizationChoice.hasOwnProperty("answerMapping")) {
                legendtext = categorizationChoice.answerMapping[value];
              }

              return (
                <Fieldset legendText={legendtext}>
                  <div className="BacklogOverItemsGrid">
                    {itemsToSort.map((entry, index) => {
                      return (
                        <>
                          {entry[
                            categorizationChoice.propertyName
                          ].toString() === value && (
                            <BacklogOverviewItem
                              key={index}
                              backlogEntry={entry}
                            />
                          )}
                        </>
                      );
                    })}
                  </div>
                </Fieldset>
              );
            })}
          </>
        ) : (
          <div className="BacklogOverItemsGrid">
            {itemsToSort.map((entry, index) => (
              <BacklogOverviewItem key={index} backlogEntry={entry} />
            ))}
          </div>
        )}
      </>
    </>
  );
};
SortingContainer.propTypes = {};

SortingContainer.defaultProps = {};

export default SortingContainer;
