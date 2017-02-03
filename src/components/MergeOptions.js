import React, { PropTypes } from 'react'
import { Map } from 'immutable';
import Checkbox from 'rc-checkbox';
import { Grid, Row, Col } from 'react-bootstrap';


export const INPUT_DELIMITER = 'input_delimiter'
export const OUTPUT_DELIMITER = 'output_delimiter'
export const REMOVE_STOP_WORDS = 'remove_stop_words'
export const PORTER_STEMMER = 'porter_stemmer'
export const WORDNET_LEMMATIZER = 'wordnet_lemmatizer'
export const LOWERCASE = "lowercase"
export const ALPHANUMERIC_FILTER = "alphanumeric_filter"
export const ALPHA_FILTER = "alpha_filter"
export const NUMERIC_FILTER = "numeric_filter"



export const MergeOptions = ({options, optionOnChange}) => (

  <div id="sidebar-wrapper">
    <Grid fluid={true}>
      <Row bsClass="row sidebar-brand">
        Merge Options
      </Row>
      <Row>
        <Col md={7} ><span>Input Delimeter:</span></Col>
        <Col md={5} >
          <textarea name={INPUT_DELIMITER} value={options.get(INPUT_DELIMITER)}
                        onChange={(event) => optionOnChange(INPUT_DELIMITER, event.target.value)}
                             rows="2" cols="5" />
        </Col>
      </Row>
      <Row>
        <Col md={7} ><span>Output Delimeter:</span></Col>
        <Col md={5} >
          <textarea name={OUTPUT_DELIMITER} value={options.get(OUTPUT_DELIMITER)}
                      onChange={(event) => optionOnChange(OUTPUT_DELIMITER, event.target.value)}
                           rows="2" cols="5" />
        </Col>
      </Row>
      <Row>
        <Col md={7} ><span>Remove stop words:</span></Col>
        <Col md={5} >
          <Checkbox name={REMOVE_STOP_WORDS}
            checked={options.get(REMOVE_STOP_WORDS)}
            onChange={(event) => optionOnChange(REMOVE_STOP_WORDS, event.target.checked)}/>
        </Col>
      </Row>
      <Row>
        <Col md={7} ><span>Porter Stemmer:</span></Col>
        <Col md={5} >
          <Checkbox name={PORTER_STEMMER} checked={options.get(PORTER_STEMMER)}
            onChange={(event) => optionOnChange(PORTER_STEMMER, event.target.checked)}/>
        </Col>
      </Row>
      <Row>
        <Col md={7} ><span>WordNet Lemmatizer:</span></Col>
        <Col md={5} >
          <Checkbox name={WORDNET_LEMMATIZER}
            checked={options.get(WORDNET_LEMMATIZER)}
            onChange={(event) => optionOnChange(WORDNET_LEMMATIZER, event.target.checked)}/>
        </Col>
      </Row>
      <Row>
        <Col md={7} ><span>Lowercase:</span></Col>
        <Col md={5} >
          <Checkbox name={LOWERCASE}
            checked={options.get(LOWERCASE)}
            onChange={(event) => optionOnChange(LOWERCASE, event.target.checked)}/>
        </Col>
      </Row>

      <Row>
        <Col md={7} ><span>Alphanumeric filter:</span></Col>
        <Col md={5} >
          <Checkbox name={ALPHANUMERIC_FILTER}
            checked={options.get(ALPHANUMERIC_FILTER)}
            onChange={(event) => optionOnChange(ALPHANUMERIC_FILTER, event.target.checked)}/>
          </Col>
      </Row>

      <Row>
        <Col md={7} ><span>Alpha filter:</span></Col>
        <Col md={5} >
          <Checkbox name={ALPHA_FILTER} checked={options.get(ALPHA_FILTER)}
            onChange={(event) => optionOnChange(ALPHA_FILTER, event.target.checked)}/>
        </Col>
      </Row>

      <Row>
        <Col md={7} ><span>Numeric filter:</span></Col>
        <Col md={5} >
          <Checkbox name={NUMERIC_FILTER}
            checked={options.get(NUMERIC_FILTER)}
            onChange={(event) => optionOnChange(NUMERIC_FILTER, event.target.checked)}/>
        </Col>
      </Row>
    </Grid>
  </div>

)

MergeOptions.propTypes = {
  options:   PropTypes.instanceOf(Map),
  optionOnChange: PropTypes.func.isRequired
}


