import React, {useState} from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {extractHubURL, fetch} from "../services/dataAccess";
import Link from "react-router-dom/es/Link";

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <InputBase
      placeholder="Search…"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
      inputProps={{
        'aria-label': 'search',
        inputRef: ref,
        ...InputProps,
      }}
      {...other}
    />
  );
}

renderInput.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  InputProps: PropTypes.object,
};

function renderSuggestion(suggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <Link to={`/les-projets/${encodeURIComponent(suggestion['@id'])}`}>
      <MenuItem
        {...itemProps}
        key={suggestion.label}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.label}
      </MenuItem>
    </Link>

  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]).isRequired,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.object.isRequired,
  selectedItem: PropTypes.string.isRequired,
  suggestion: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
};

function getSuggestions(value, setSuggestions, inputValueState, setInputValueState, { showEmpty = false } = {}) {
  if (value !== inputValueState) {
    const inputValue = deburr(value.trim());
    const inputLength = inputValue.length;
    let count = 0;
    setInputValueState(inputValue)

    fetch(`/projects?pitch=${inputValue}`)
      .then(response =>
        response
          .json()
          .then(retrieved => {
            let projectSuggestions = Array.from(retrieved['hydra:member'], project => { return { label: project.pitch, '@id': project['@id'] } })
            if (inputLength !== 0) {
              projectSuggestions.filter(suggestion => {
                const keep =
                  count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

                if (keep) {
                  count += 1;
                }
              });
              setSuggestions(projectSuggestions);
            } else {
              setSuggestions([]);
            }
            }
          )
      );
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  divider: {
    height: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 95,
      '&:focus': {
        width: 300,
      },
    },
    [theme.breakpoints.up('md')]: {
      width: 95,
      '&:focus': {
        width: 400,
      },
    },
    [theme.breakpoints.up('lg')]: {
      width: 95,
      '&:focus': {
        width: 400,
      },
    },
    [theme.breakpoints.up('xl')]: {
      width: 95,
      '&:focus': {
        width: 600,
      },
    },
    border: '1px solid rgba(0,0,0,0.14)',
    borderRadius: '4px'
  },
}));

export default function CustomSearchBar() {
  const classes = useStyles();
  const [suggestions, setSuggestions] = useState(
    []
  );
  const [inputValueState, setInputValueState] = useState(
    ''
  );

  return (
    <div className={classes.root}>
      <Downshift id="downshift-simple">
        {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            selectedItem,
          }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder: 'Rechercher',
          });

          return (
            <div className={classes.container}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                {renderInput({
                  fullWidth: true,
                  classes,
                  inputlabelprops: getLabelProps({ shrink: true }),
                  InputProps: { onBlur, onFocus },
                  inputProps,
                })}
              </div>

              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue, setSuggestions, inputValueState, setInputValueState)}
                    {suggestions.map((suggestion, index) =>
                        renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.label }),
                          highlightedIndex,
                          selectedItem,
                        })
                    )}
                  </Paper>
                ) : null}
              </div>

            </div>
          );
        }}
      </Downshift>
    </div>
  );
}
