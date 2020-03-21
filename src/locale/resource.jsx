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
            'item': ['item length at least %{count}!', 'term in the %{pos} cannot be empty!', 'definition in the %{pos} cannot be empty!', 'term cannot be duplicate!'],
            'term': 'term',
            'definition': 'definition',
            'dialog': {
                'title': 'NEW SET!',
                'name': 'set name',
                'description': 'description',
                'create': 'create',
                'err': ['set name cannot be empty!'],
                'createSuccess': 'create success！'
            }
        },
        'learn': {
            'termEmpty': 'term cannot be empty',
            'defEmpty': 'definition cannot be empty',
            'errTerms': 'Err Terms',
            'nextRound': 'Next Round',
            'reLearn': 'relearn'
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
            'item': ['至少包含%{count}个项！', '第%{pos}个术语不能为空！', '第%{pos}个术语定义不能为空！', '术语不能重复！'],
            'term': '术语',
            'definition': '定义',
            'dialog': {
                'title': '新的单词集!',
                'name': '单词集标题',
                'description': '描述',
                'create': '创建',
                'err': ['单词集名字不能为空!'],
                'createSuccess': '创建成功！'
            }
        },
        'learn': {
            'termEmpty': '术语不能为空',
            'defEmpty': '定义不能为空',
            'errTerms': '错误回顾',
            'nextRound': '下一轮',
            'reLearn': '重新学习'
        }
    }
}


export default resources