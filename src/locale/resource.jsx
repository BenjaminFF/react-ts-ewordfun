const resources = {
    'en': {
        'login': {
            'signin': 'sign in',
            'signup': 'sign up',
            'forgetpw': 'forget pw',
            'emailplaceholder': 'email',
            'pwplaceholder': 'password',
            'emailValidate': ['please input email', 'please input valid email'],
            'pwValidate': ['please input password', 'the password length at least 6', 'email or password is error']

        },
        'setcreate': {
            'item': ['item length at least %{count}', 'term in the %{pos} cannot be empty.', 'definition in the %{pos} cannot be empty.'],
            'term': 'term',
            'definition': 'definition'
        }
    },
    'cn': {
        'login': {
            'signin': '注册',
            'signup': '登录',
            'forgetpw': '忘记密码',
            'emailplaceholder': '邮箱',
            'pwplaceholder': '密码',
            'emailValidate': ['请输入邮箱', '请输入正确的邮箱'],
            'pwValidate': ['请输入密码', '密码长度不低于6位', '账号或密码错误']
        },
        'setcreate': {
            'item': ['至少包含%{count}个项', '第%{pos}个术语不能为空！', '第%{pos}个术语定义不能为空！'],
            'term': '术语',
            'definition': '定义'
        }
    }
}


export default resources