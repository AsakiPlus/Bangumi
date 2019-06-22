/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-23 00:23:17
 */
import React from 'react'
import { ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Loading } from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { inject, observer } from '@utils/decorators'
import { analysis } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import _ from '@styles'
import Award from './award'
import List from './list'
import Store from './store'

const title = '聚合发现'

export default
@inject(Store)
@observer
class Discovery extends React.Component {
  static navigationOptions = {
    header: null
  }

  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    analysis('discovery', title)
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.home
    if (!_loaded) {
      return <Loading style={_.container.screen} />
    }

    const { onScroll } = this.props
    return (
      <ScrollView
        style={_.container.screen}
        contentContainerStyle={_.container.bottom}
        scrollEventThrottle={32}
        onScroll={onScroll}
      >
        <StatusBarPlaceholder style={{ backgroundColor: _.colorBg }} />
        <Award />
        {MODEL_SUBJECT_TYPE.data.map(item => (
          <List key={item.label} type={item.label} />
        ))}
      </ScrollView>
    )
  }
}