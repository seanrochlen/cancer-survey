import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import shortid from 'shortid';

/**
 * Date of birth selects for day, month, and year
 */
function DateOfBirth(props) {
  const { birthDay, birthMonth, birthYear, handleChange } = props;
  const { t } = useTranslation();
  const days = [];
  const months = [];
  const years = [];

  for (let d = 1; d <= 31; d += 1)
    days.push(<option key={shortid.generate()} value={d}>{d}</option>);

  for (let m = 1; m <= 12; m += 1)
    months.push(<option key={shortid.generate()} value={m}>{m}</option>);

  for (let y = new Date().getFullYear(); y >= new Date().getFullYear() - 100; y -= 1)
    years.push(<option key={shortid.generate()} value={y}>{y}</option>);

  return (
    <div>
      <h2>{ t('h2-birthdate') }</h2>

      <div className="row">
        <div className="select-holder">
          <select
            name="birthMonth"
            onChange={handleChange}
            value={birthMonth}
          >
            <option value="" disabled>{ t('option-month') }</option>
            {months}
          </select>
        </div>
        <div className="select-holder">
          <select
            name="birthDay"
            onChange={handleChange}
            value={birthDay}
          >
            <option value="" disabled>{ t('option-day') }</option>
            {days}
          </select>
        </div>
        <div className="select-holder">
          <select
            name="birthYear"
            onChange={handleChange}
            value={birthYear}
          >
            <option value="" disabled>{ t('option-year') }</option>
            {years}
          </select>
        </div>
      </div>
    </div>
  );
}

/**
 * props
 * @param {string} birthDay birth day
 * @param {string} birthMonth birth month
 * @param {string} birthYear birth year
 * @param {function} handleChange updates parent state
 */
DateOfBirth.propTypes = {
  birthDay: PropTypes.string.isRequired,
  birthMonth: PropTypes.string.isRequired,
  birthYear: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default DateOfBirth;
