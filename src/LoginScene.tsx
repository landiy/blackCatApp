import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import store from './redux/store';
import { Svg } from './utils/Svg';
import { i18n } from './utils/multiLang'

export interface Props {
    navigation: {
        replace: Function
    },
}
interface State {
    errMsgVisible: boolean,
    lang: string,
    focusInputType: string
}

export class LoginScene extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            errMsgVisible: false,
            lang: i18n.defaultLocale,
            focusInputType: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    static navigationOptions = {
        header: null
    };

    userName = '';
    userPsd = '';
    unsubscribeFn = () => { };

    componentDidMount() {
        this.unsubscribeFn = store.subscribe(this.handleChange);
    }

    componentWillUnmount() {
        this.unsubscribeFn();
    }

    handleChange() {
        if (store.getState().isLogin) {
            this.props.navigation.replace('List');
        } else {
            this.setState({ errMsgVisible: true }) //跳转页面的瞬间state全部变回初始值,然后又变回现有值
        }
    }

    handleLogin() {
        store.dispatch({
            type: 'TOKEN_FETCH_REQUESTED',
            payload: { username: this.userName, password: this.userPsd }
        });
    }

    toggleLang = () => {
        i18n.locale = i18n.locale === 'zh' ? 'en' : 'zh';
        this.setState({ lang: i18n.locale })
    }

    render() {
        return (
            <View style={styles.wrap}>
                <View style={styles.content}>
                    <Text
                        style={styles.language}
                        onPress={this.toggleLang.bind(this)}>{i18n.t('lang')}
                    </Text>
                    <Text style={styles.subTitle}>{i18n.t('bigTitle')}</Text>
                    <Text style={styles.mainTitle}>{i18n.t('appName')}</Text>
                    <View style={styles.iconCircle}>
                        <Svg icon="logo-cat" size="45" color="#D5EF7F" />
                    </View>

                    <View>
                        <View style={styles.loginInputIcon}>
                            <Svg icon="user" size="16" color="#D3C1E5" />
                        </View>

                        <TextInput
                            style={this.state.focusInputType === 'userName' ?
                                [styles.loginInput, styles.loginInputActive] : styles.loginInput}
                            placeholder={i18n.t('user_name')}
                            onChangeText={(userName) => { this.userName = userName; this.setState({ errMsgVisible: false }) }}
                            onFocus={() => {
                                this.setState({ focusInputType: 'userName' })
                            }} />
                    </View>
                    <View>
                        <View>
                            <View style={styles.loginInputIcon}>
                                <Svg icon="password" size="16" color="#D3C1E5" />
                            </View>
                        </View>
                        <TextInput
                            style={this.state.focusInputType === 'password' ?
                                [styles.loginInput, styles.loginInputActive] : styles.loginInput}
                            placeholder={i18n.t('psd')}
                            secureTextEntry={true}
                            onChangeText={(userPsd) => { this.userPsd = userPsd; this.setState({ errMsgVisible: false }) }}
                            onFocus={() => {
                                this.setState({ focusInputType: 'password' })
                            }} />

                        {/* {this.state.errMsgVisible ? (<Text style={styles.errorMsg}>{i18n.t('error')}</Text>) : null} */}

                    </View>
                </View>
                <TouchableOpacity
                    style={styles.footer}
                    onPress={this.handleLogin.bind(this)}>
                    <Text style={styles.footerText}>
                        {i18n.t('signin')}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#8560A9',
        opacity: 0.7
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        height: 64,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D5EF7F'
    },
    footerText: {
        fontSize: 16,
        color: '#453257',
        fontWeight: 'bold',
    },
    subTitle: {
        marginTop: 69,
        fontSize: 16,
        height: 24,
        color: '#D5EF7F'
    },
    mainTitle: {
        marginTop: 16,
        fontSize: 24,
        height: 30,
        fontWeight: 'bold',
        color: '#D5EF7F'
    },
    iconCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 64,
        height: 64,
        marginTop: 37,
        marginBottom: 118,
        borderColor: '#D5EF7F',
        borderWidth: 1,
        borderRadius: 64
    },
    loginInput: {
        width: 240,
        height: 40,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#FFF',
        borderRadius: 20,
        marginBottom: 20,
        paddingLeft: 32
    },
    loginInputActive: {
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    loginInputIcon: {
        position: 'absolute',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        left: 12
    },
    errorMsg: {
        position: 'absolute',
        bottom: 30,
        color: 'red',
        fontSize: 11,
    },
    language: {
        position: 'absolute',
        fontSize: 15,
        right: 20,
        top: 50,
        color: '#FFF'
    }
})