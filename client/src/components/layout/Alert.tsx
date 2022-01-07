import { connect, RootStateOrAny } from 'react-redux';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Alert = () => {
  const alerts = useSelector((state: RootStateOrAny) => state.alert);

  const alerMessage =
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ));

  return alerMessage;
};

// Alert.propType = {
//   alerts: PropTypes.array.isRequired,
// };

// const mapStateToProps = (state) => ({
//   alerts: state.alert,
// });

// export default connect(mapStateToProps)(Alert);

export default Alert;
