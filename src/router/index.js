import Vue from "vue";
import Router from "vue-router";

// import IndexMain from "@/components/main/Init"; //应用初始化
const IndexMain = () => import("@/components/main/Init") //应用初始化

const Login = () => import("@/components/main/Login"); //登录
const PhoneLogin = () => import("@/components/main/phoneLogin"); //手机登录
const VCode = () => import("@/components/main/vcode"); //获取验证码
const RegisterSelect = () => import("@/components/main/RegSelect"); //注册选择
const RegPhone = () => import('@/components/main/regPhone'); //手机注册
const Register = () => import("@/components/main/Reg"); //注册功能
const BackPassWord = () => import("@/components/main/GetPass"); //手机&&邮箱找回密码
const SetPassWord = () => import("@/components/main/setPass"); //设置密码
const PersonalInformation = () => import("@/components/main/PersonalInformation"); //完善个人信息

const Main = () => import("@/components/main/Index"); //首页
const SearchList = () => import("@/components/main/Searchlist"); //首页搜索列表

const MainInformation = () => import("@/components/main/information"); //分类列表
const MainMore = () => import("@/components/main/classMore"); //更多分类
const MainSoldier = () => import("@/components/main/soldierList"); //军人列表

const NewsList = () => import("@/components/news/list"); //新闻列表
const NewsInfo = () => import("@/components/news/info"); //新闻详情

const SpecialTalents = () => import("@/components/main/specialTalents"); //专家库-高级人才[待完善]
const SpecialTalentsInfo = () => import("@/components/main/specialTalentsInfo"); //专家库-高级人才[待完善]


//-服务模块
const ServiceMain = () => import("@/components/service/index"); //服务首页
const LessonGroup = () => import("@/components/service/video"); //视频课程
const LabourServices = () => import("@/components/service/labor"); //劳务提交
const LegalPolicy = () => import("@/components/service/policy"); //法务政策
const LegalAid = () => import("@/components/service/assistance"); //法律援助
const LawInfo = () => import("@/components/service/policyShow"); //法务政策详情
const VideoPlayer = () => import("@/components/service/videoPlayer"); //视频播放
const SalarySheet = () => import("@/components/service/salarySheet"); //工资条

//-发票代开功能
/**
邮寄地址待优化
**/
const InvoiceFill = () => import("@/components/service/invoice"); //发票代开
const AddInvoiceInfo = () => import("@/components/service/invoiceInfoAdd"); //发票信息管理
const ListInvoiceInfo = () => import("@/components/service/invoiceInfoList"); //发票信息列表
const AddLaborsInfo = () => import("@/components/service/invoiceLabors"); //劳务者信息管理


//-会员中心模块
const UserCenter = () => import("@/components/user/index"); //会员首页
const newUserCenter = () => import('@/components/user/newUserCenter'); //新！用户中心
const UserSet = () => import("@/components/user/setting"); //会员设置
const SetUserName = () => import("@/components/user/setUserName"); //修改昵称
const About = () => import("@/components/user/about"); //我的-关于
const PersonalAuth = () => import("@/components/user/authPersonal"); //个人认证
const CompanyAuth = () => import("@/components/user/authCompany"); //企业认证
const SoldierAuth = () => import("@/components/user/authSoldier"); //军人认证
const UserBankCard = () => import("@/components/user/bankCard"); //银行卡管理
const UnlockBankCard = () => import("@/components/user/bankCardInfo"); //银行卡详情
const AddBankCard = () => import("@/components/user/bankCardAdd"); //新增银行卡
const UserInvoice = () => import("@/components/user/invoice"); //发票管理
const UserInvoiceDetail = () => import("@/components/user/invoiceInfo"); //发票详情
const UserAddr = () => import("@/components/user/address"); //地址管理
const AddNewAddr = () => import("@/components/user/addressAdd"); //地址管理

const MyPostList = () => import("@/components/user/myPost"); //我的岗位列表
const MyPostNext = () => import("@/components/user/myPostNext"); //我的岗位列表下级
const UserResume = () => import("@/components/user/resume"); //我的简历
const UserResumeNext = () => import("@/components/user/resumeNext"); //我的简历下级
const ReResume = () => import('@/components/user/reResume'); //编辑简历
const UserBalance = () => import("@/components/user/balance"); //资产管理
const UserWallet = () => import("@/components/user/wallet"); //我的钱包
const UserBill = () => import("@/components/user/bill"); //我的账单
const ResetPass = () => import('@/components/user/resetPass'); //设置密码&二级密码&更换手机&更改邮箱
const safeVcode = () => import('@/components/user/newVcode'); //设置验证码 密码&二级密码&更换手机&更改邮箱
const safeResetPass = () => import('@/components/user/resetDetail'); //设置 密码&二级密码&更换手机&更改邮箱
const SafeCenter = () => import("@/components/user/safeCenter"); //安全中心
const UserBillDatail = () => import("@/components/user/balanceInfo"); //资产历史详情
const Recharge = () => import("@/components/user/recharge"); //充值管理
const Cash = () => import("@/components/user/cash"); //提现管理
const Order = () => import("@/components/user/order"); //订单管理
const UserInsurance = () => import("@/components/user/insurance"); //保险管理
const UserCredit = () => import("@/components/user/credit"); //信用管理
const ReadingGuide = () => import("@/components/user/readingGuide"); //关于-阅读指南
const QRCode = () => import("@/components/user/QRcode"); //立即分享
const Feedback = () => import("@/components/user/Feedback"); //意见反馈



//-公共模块
const DemandGroup = () => import("@/components/public/classGroup"); //分类列表模块
const PayCompleted = () => import("@/components/public/paySuccess"); //支付成功
const Evaluate = () => import("@/components/public/evaluate"); //评价
const Payment = () => import("@/components/public/payment"); //立即支付
const CityList = () => import("@/components/public/CityList"); //城市列表
const Search = () => import("@/components/public/Search"); //搜索
const BannerDetail = () => import("@/components/public/bannerDetail"); //轮播详情
const OrderDetail = () => import("@/components/public/orderDetails"); //订单详情


//-消息模块
const Message = () => import("@/components/message/index"); //消息列表
const MessageSys = () => import("@/components/message/system"); //系统消息
const Interview = () => import("@/components/message/listInterview"); //面试邀请列表
const ServiceChat = () => import("@/components/message/showService"); //技能兼职聊天
const InterviewerChat = () => import("@/components/message/interviewer_chat"); //面试者聊天
const InterviewChat = () => import("@/components/message/interview_chat"); //招聘者聊天
const SelectPostList = () => import("@/components/message/select_post_list"); //岗位列表


//-信息库
const Information = () => import("@/components/Information_base/list"); //信息库
const ServiceDetail = () => import("@/components/Information_base/service_info"); //服务详情
const SkillDetail = () => import("@/components/Information_base/skill_info"); //技能详情
const ResumeInfo = () => import("@/components/Information_base/resume_info"); //简历详情
const PostInfo = () => import("@/components/Information_base/post_info"); //岗位详情
const Report = () => import("@/components/Information_base/Report"); //举报职位
const CompanyDetail = () => import("@/components/Information_base/CompanyDetail"); //公司详情


//-发布模块
const ReleaseDemand = () => import("@/components/release/release_demand"); //兼职发布
const ReleaseSkill = () => import("@/components/release/release_skill"); //技能发布
const ReleasePost = () => import("@/components/release/release_post"); //岗位发布
const ReleaseResume = () => import("@/components/release/release_resume"); //简历发布
const ResumeView = () => import("@/components/release/resume_view"); //简历预览
const EditorExperience = () => import("@/components/release/editor_experience"); //工作经历
const EditorEducation = () => import("@/components/release/editor_education"); //教育经历
const SelectAddr = () => import("@/components/release/select_addr"); //会员地址选择[已废弃]
const PostLabel = () => import("@/components/release/post_label"); //岗位标签管理
const ServiceTime = () => import("@/components/release/service_time"); //服务时间模块
const SalaryEditor = () => import("@/components/release/salary_editor"); //酬金管理模块


//-保险模块
const InsuranceCenter = () => import("@/components/Insurance/Insurance_center"); //保险中心
const SocialSubstitute = () => import("@/components/Insurance/social_substitute"); //社会保险代缴
const InsuranceMain = () => import("@/components/Insurance/Insurance_main"); //保险主页
const InsuranceInfo = () => import("@/components/Insurance/Insurance_info"); //保险信息
const HolderInfo = () => import("@/components/Insurance/holder_info"); //投保人信息
const AddPersonnel = () => import("@/components/Insurance/add_personnel"); //添加人员
const InsuranceOrder = () => import("@/components/Insurance/insurance_order"); //投保订单详情
const InsurancePayment = () => import("@/components/Insurance/insurance_payment"); //投保支付详情
const PolicyInterpretation = () => import("@/components/Insurance/PolicyInterpretation"); //社保政策解读
const PolicyInterpretationInfo = () => import("@/components/Insurance/PolicyInterpretation_info"); //社保政策解读详情
const SocialSecurityInfo = () => import("@/components/chao/social_security"); //社保详情
const Calculator = () => import("@/components/chao/calculator"); //社保计算器
const InsuranceSearch = () => import("@/components/Insurance/InsuranceSearch"); //社保查询


//-order
const orderList = () => import("@/components/order/orderList"); //订单列表
const orderListNext = () => import("@/components/order/orderListNext"); //订单列表下级
const partList = () => import("@/components/order/partList"); //兼职列表
const partListNext = () => import("@/components/order/partListNext"); //兼职列表下级


//-组件-未知-其他
const MapGroup = () => import("@/components/sub/map_group"); //百度地图
const NewMapGroup = () => import("@/components/sub/new_map_group"); //高德地图

const Detail = () => import("@/components/detail");
const Chat = () => import("@/components/chat");
const ListModel = () => import("@/components/list_model");
const RobConfirmModel = () => import("@/components/robconfirm_model");
// const LoadingTpl = ()=>import("@/components/sub/LoadingTpl");//LoadingTpl
const ListDemo = () => import("@/components/list_demo");
// download app
const DownLoad = () => import("@/components/downLoad"); //下载app


Vue.use(Router);

const router = new Router({
   routes: [
    {
      path: "/", //应用初始化
      name: "IndexMain",
      component: IndexMain
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: '/phoneLogin', //获取验证码
      name: 'PhoneLogin',
      component: PhoneLogin
    },
    {
      path: '/vcode/:str', //获取验证码
      name: 'VCode',
      component: VCode,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/register_select/:type", //注册选择
      name: "RegisterSelect",
      component: RegisterSelect,
      meta: {
        // index: 0,
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: '/RegPhone/:type', //手机号码注册
      name: 'RegPhone',
      component: RegPhone,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/register/:type", //注册功能
      name: "Register",
      component: Register,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/back_password", // 手机号找回密码
      name: "BackPassWord",
      component: BackPassWord,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/personalInformation", //完善个人信息
      name: "PersonalInformation",
      component: PersonalInformation,
      meta: {
        showHeader: false,
        showFooter: false,
        needLogin: true //需要登陆验证
      }
    },
    {
      path: '/setPassWord',
      name: 'SetPassWord',
      component: SetPassWord,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/main", //根页面
      name: "main",
      component: Main,
      meta: {
        // index: 0,
        showFooter: true
      }
    },
    {
      path: "/searchlist/:kw", //首页搜索列表
      name: "SearchList",
      component: SearchList,
      meth: {
        showHeader: false,
        showFooter: false
      }
    },
    {
      path: "/main_information/:name/:mid/:type", //主页四大分类
      name: "MainInformation",
      component: MainInformation,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/main_more", //主页更多选择
      name: "MainMore",
      component: MainMore,
      meta: {
        showHeader: true
      }
    },
    /*
    	{
    		path: "/main_born",//主页通知公告
    		name: "MainBorn",
    		component: MainBorn,
    		meta: {
    			showHeader: true
    		}
    	},
    */
    {
      path: "/main_soldier", //主页军人列表
      name: "MainSoldier",
      component: MainSoldier,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/NewsList/:pid/", //新闻列表
      name: "NewsList",
      component: NewsList,
      meta: {
        showHeader: true,
        showFooter: true,
      }
    },
    {
      path: "/NewsInfo/:id", //新闻详情
      name: "NewsInfo",
      component: NewsInfo,
      meta: {
        showHeader: true,
        showFooter: true,
      }
    },
    {
      path: "/special_talents", // 高级人才
      name: "SpecialTalents",
      component: SpecialTalents
    },
    {
      path: "/SpecialTalentsInfo/:id", // 高级人才
      name: "SpecialTalentsInfo",
      component: SpecialTalentsInfo,
      meta: {
        showHeader: true,
      }
    },
    /**
     * -服务模块-
     * @ServiceMain 服务首页
     * @LessonGroup 视频课程
     * @LabourServices 劳务提交
     * @LegalPolicy 法务政策
     * @LegalAid 法律援助
     * @LawInfo 法务政策详情
     * @VideoPlayer 视频播放
     * @SalarySheet 工资条
     */
    {
      path: "/service_main",
      name: "ServiceMain",
      component: ServiceMain,
      meta: {
        // index: 0,
        showFooter: true,
        showHeader: false,
        keepAlive: true
      },
    },
    {
      path: "/lesson_group",
      name: "LessonGroup",
      component: LessonGroup,
    },
    {
      path: "/labour_services",
      name: "LabourServices",
      component: LabourServices,
      meta: {
		showHeader: true,
		needLogin:true
      }
    },
    {
      path: "/legal_policy",
      name: "LegalPolicy",
      component: LegalPolicy,
    },
    {
      path: "/legal_aid",
      name: "LegalAid",
      component: LegalAid,
      meta: {
		showHeader: true,
		needLogin:true
      }
    },
    {
      path: "/law_info/:id",
      name: "LawInfo",
      component: LawInfo,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/VideoPlayer",
      name: "VideoPlayer",
      component: VideoPlayer,
      meta: {
        showHeader: false
      }
    },
    {
      path: "/SalarySheet",
      name: "SalarySheet",
      component: SalarySheet,
    },
    /**
     * -发票代开功能-
     * 邮寄地址待优化
     * @InvoiceFill 带开发票
     * @AddInvoiceInfo 添加发票信息
     * @ListInvoiceInfo 添加发票信息
     * @AddLaborsInfo 添加劳务信息
     */
    {
      path: "/invoice_fill/:type",
      name: "InvoiceFill/:type",
      component: InvoiceFill,
      meta: {
        showHeader: true,
		showFooter: false,
		needLogin:true
      }
    },
    {
      path: "/addinvoiceinfo/:id",
      name: "AddInvoiceInfo",
      component: AddInvoiceInfo,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/ListInvoiceInfo/:type",
      name: "ListInvoiceInfo",
      component: ListInvoiceInfo,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/addlaborsinfo/:type",
      name: "AddLaborsInfo",
      component: AddLaborsInfo,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    /**
     * -会员中心模块-
     * @UserCenter 会员首页
     * @newUserCenter 用户中心
     * @UserSet 会员设置
     * @SetUserName 修改昵称
     * @About 我的-关于
     * @PersonalAuth 个人认证
     * @CompanyAuth 企业认证
     * @SoldierAuth 军人认证
     * @UserBankCard 银行卡管理
     * @UnlockBankCard 解绑银行卡
     * @AddBankCard 新增银行卡
     * @UserInvoice 发票管理
     * @UserInvoiceDetail 用户发票详情
     * @UserAddr 用户地址
     * @AddNewAddr 添加新地址
     * @MyPostList  我的岗位列表
     * @MyPostListNext  我的岗位列表下级
     * @UserResume 我的简历
     * @UserResumeNext 我的简历下级
     * @ReResume 编辑简历
     * @UserBalance 资产管理
     * @UserWallet  我的钱包
     * @UserBill  我的账单
     * @ResetPass  修改密码&二级密码&更换手机号&更改邮箱
     * @safeVcode  设置验证码 密码&二级密码&更换手机号&更改邮箱
     * @safeResetPass  设置 密码&二级密码&更换手机号&更改邮箱
     * @SafeCenter  安全中心
     * @UserBillDatail 资产历史详情
     * @Recharge 充值管理
     * @Cash 提现管理
     * @Order 订单管理
     * @UserInsurance 保险管理
     * @UserCredit 信用管理
     * @ReadingGuide 关于-阅读指南
     * @QRCode 立即分享
     * @Feedback 意见反馈
     */
    {
      path: "/usercenter",
      name: "UserCenter",
      component: UserCenter,
      meta: {
        // index: 0,
        showFooter: true
      }
    },
    {
      path: "/newUserCenter",
      name: "newUserCenter",
      component: newUserCenter,
      meta: {
        showFooter: true,
        needLogin: true
      }
    },
    {
      path: "/usersetting", //用户设置
      name: "UserSet",
      component: UserSet,
      meta: {
		showHeader: true,
		needLogin:true
      }
    },
    {
      path: "/set_user_name/:uname", // 修改名称
      name: "SetUserName",
      component: SetUserName,
      meta: {
		showHeader: true,
		needLogin:true
      }
    },
    {
      path: "/About", //我的-关于
      name: "About",
      component: About,
      meta: {
        showHeader: true,
        showFooter: false,
      }
    },
    {
      path: "/personal_auth/:rid/:status", //个人认证
      name: "PersonalAuth",
      component: PersonalAuth,
      meta: {
		showHeader: true,
		needLogin:true
      }
    },
    {
      path: "/company_auth/:rid/:status", //企业认证
      name: "CompanyAuth",
      component: CompanyAuth,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/soldier_auth/:rid/:status", //军人认证
      name: "SoldierAuth",
      component: SoldierAuth,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/userbankcard/:type", //用户银行卡
      name: "UserBankCard",
      component: UserBankCard,
      meta: {
        showHeader: true,
      }
    },
    {
      path: "/unlockbankcard/:id", //解绑银行卡
      name: "UnlockBankCard",
      component: UnlockBankCard,
      meta: {
        showHeader: true,
      }
    },
    {
      path: "/addbankcard/:page_num", //添加银行卡
      name: "AddBankCard",
      component: AddBankCard,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/user_invoice", //我的发票
      name: "UserInvoice",
      component: UserInvoice,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/user_invoice_detail/:id", // 用户发票详情
      name: "UserInvoiceDetail",
      component: UserInvoiceDetail,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/user_addr/:type", //我的地址
      name: "UserAddr",
      component: UserAddr,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/add_new_addr/:id", // 添加新地址
      name: "AddNewAddr",
      component: AddNewAddr,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/MyPostList", //我的岗位列表
      name: "MyPostList",
      component: MyPostList,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/MyPostNext", //我的岗位列表下级
      name: "MyPostNext",
      component: MyPostNext,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/user_resume", //我的简历
      name: "UserResume",
      component: UserResume,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/UserResumeNext", //我的简历下级
      name: "UserResumeNext",
      component: UserResumeNext,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/reresume", //编辑简历
      name: 'ReResume',
      component: ReResume,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/user_balance", //资产管理
      name: "UserBalance",
      component: UserBalance,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/user_wallet", //我的钱包
      name: "UserWallet",
      component: UserWallet,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/user_bill", //我的账单
      name: "UserBill",
      component: UserBill,
    },
    {
      path: '/ResetPass/:type', //修改 密码&交易密码&手机号&更改邮箱
      name: 'ResetPass',
      component: ResetPass,
      meta: {
        showHeader: true
      }
    },
    {
      path: '/safeVcode/:str', //获取验证码 密码&交易密码&手机号&更改邮箱
      name: 'safeVcode',
      component: safeVcode,
      meta: {
        showHeader: true,
        goBcak: true
      }
    },
    {
      path: '/safeResetPass/:str', //重新设置 密码&交易密码&手机号&更改邮箱
      name: 'safeResetPass',
      component: safeResetPass,
      meta: {
        showHeader: true,
        goBcak: true
      }
    },
    {
      path: "/safecenter", //安全中心
      name: "SafeCenter",
      component: SafeCenter,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/userbilldatail/:uid", //资产历史详情
      name: "UserBillDatail",
      component: UserBillDatail,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/Recharge", //充值
      name: "Recharge",
      component: Recharge,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/cash", //提现
      name: "Cash",
      component: Cash,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/order/:uid", //订单管理
      name: "Order",
      component: Order
    },
    {
      path: "/userInsurance/:uid", //保险管理
      name: "UserInsurance",
      component: UserInsurance,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/usercredit/:uid", //信用管理
      name: "UserCredit",
      component: UserCredit
    },
    {
      path: "/readingguide/:xid", //关于-阅读指南
      name: "ReadingGuide",
      component: ReadingGuide,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/qrcode",
      name: "QRCode",
      component: QRCode,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/feedback",
      name: "Feedback",
      component: Feedback,
      meta: {
        showHeader: true
      }
    },
    /**
     * -公共模块-
     * @DemandGroup 分类列表
     * @PayCompleted 支付成功
     * @Evaluate 评价
     * @Payment 立即支付
     * @CityList 城市列表
     * @Search 搜索
     * @OrderDetail 订单详情
     */
    {
      path: "/demand_group/:type", // 兼职分类
      name: "DemandGroup",
      component: DemandGroup,
      meta: {
        showHeader: false,
      }
    },
    {
      path: "/paycompleted", //支付成功
      name: "PayCompleted",
      component: PayCompleted,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/evaluate/:typeId", //评价
      name: "Evaluate",
      component: Evaluate
    },
    {
      path: "/payment/:str", //立即支付
      name: "Payment",
      component: Payment,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/city_list", //城市列表
      name: "CityList",
      component: CityList,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/search", //搜索
      name: "Search",
      component: Search
    },
    {
      path: "/bannerdetail/:bid", //轮播详情
      name: "BannerDetail",
      component: BannerDetail,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: '/orderdetail',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {
        showHeader: true,
        showFooter: false,
      }
    },
    /**
     * -消息模块-
     * @Message 消息列表
     * @MessageSys 系统消息
     * @Interview 面试邀请列表
     * @ServiceChat 技能兼职聊天
     * @InterviewerChat 面试者聊天
     * @InterviewChat 应聘者聊天
     * @SelectPostList 会员（企业）岗位列表
     */
    {
      path: "/message", //消息列表
      name: "message",
      component: Message,
      meta: {
		showHeader: true,
		needLogin:true
      }
    },
    {
      path: "/message_system", //系统消息
      name: "message_system",
      component: MessageSys,
      meta: {
        showHeader: true,
      }
    },
    {
      path: "/Interview", //面试邀请列表
      name: "Interview",
      component: Interview
    },
    {
      path: "/service_chat", //技能兼职聊天
      name: "ServiceChat",
      component: ServiceChat,
      meta: {
        showHeader: true,
        showFooter: false,
        needLogin:true
      }
    },
    {
      path: "/interviewer_chat/:id", //应聘者聊天
      name: "InterviewerChat",
      component: InterviewerChat,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/interview_chat/:id", //面试者聊天
      name: "InterviewChat",
      component: InterviewChat,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/select_post_list",
      name: "SelectPostList",
      component: SelectPostList,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    /**
     * -信息库-
     * @Information 信息库
     * @ServiceDetail 服务详情
     * @SkillDetail 技能详情
     * @ResumeInfo 简历详情
     * @PostInfo 岗位详情
     * @Report 举报职位
     * @CompanyDetail 公司详情
     */
    {
      path: "/information", //信息库
      name: "Information",
      component: Information,
      meta: {
        // index: 0,
        showFooter: true
      }
    },
    /*
    	{
    		path: "/servicedetail",//服务详情
    		name: "serviceDetail",
    		component: ServiceDetail,
    		meta: {
    			showHeader: true,
    			showFooter: false
    		}
    	},
    */
    {
      path: "/service_detail", //服务详情
      name: "serviceDetail",
      component: ServiceDetail,
      meta: {
        showHeader: true,
        showFooter: false,
      }
    },
    {
      path: "/skill_detail", //技能详情
      name: "SkillDetail",
      component: SkillDetail,
      meta: {
        showHeader: true,
      }
    },
    {
      path: "/resumeinfo/:pid", //简历详情
      name: "ResumeInfo",
      component: ResumeInfo,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/post_info/:id", //岗位详情
      name: "PostInfo",
      component: PostInfo,
      meta: {
        showHeader: true,
        showFooter: false
      }
    },
    {
      path: "/report/:type/:id", //举报详情
      name: "Report",
      component: Report,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/companyDetail",
      name: "CompanyDetail",
      component: CompanyDetail,
      meta: {
        showHeader: true
      }
    },
    /**
     * -发布模块-
     * @ReleaseDemand 兼职发布
     * @ReleaseSkill 技能发布
     * @ReleasePost 岗位发布
     * @ReleaseResume 简历发布
     * @ResumeView 简历预览
     * @EditorExperience 编辑工作经历
     * @EditorEducation 编辑教育经历
     * @SelectAddr 会员地址选择[已废弃]
     * @PostLabel 岗位标签管理
     * @ServiceTime 服务时间模块
     * @SalaryEditor 酬金管理模块
     */
    {
      path: "/release_demand", //发布兼职
      name: "ReleaseDemand",
      component: ReleaseDemand,
      meta: {
        showHeader: true,
        needLogin: true
      }
    },
    {
      path: "/release_skill", //发布技能
      name: "ReleaseSkill",
      component: ReleaseSkill,
      meta: {
        showHeader: true,
        needLogin: true
      }
    },
    {
      path: "/release_post", //发布岗位
      name: "ReleasePost",
      component: ReleasePost,
      meta: {
        showHeader: true,
        needLogin: true
      }
    },
    {
      path: "/release_resume/:type", //发布简历
      name: "ReleaseResume",
      component: ReleaseResume,
      meta: {
        showHeader: true,
        needLogin: true
      }
    },
    {
      path: "/resume_view", //简历预览
      name: "ResumeView",
      component: ResumeView,
      meta: {
        showHeader: true,
      }
    },
    {
      path: "/editor_experience/:code", //编辑工作经历
      name: "EditorExperience",
      component: EditorExperience,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/editor_education/:code", //编辑教育经历
      name: "EditorEducation",
      component: EditorEducation,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/select_addr", //会员地址选择[已废弃]
      name: "SelectAddr",
      component: SelectAddr
    },
    {
      path: "/post_label", // 岗位标签
      name: "PostLabel",
      component: PostLabel,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/service_time/:type", // 服务时间
      name: "ServiceTime",
      component: ServiceTime,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/salary_editor/:type", // 薪酬编辑
      name: "SalaryEditor",
      component: SalaryEditor,
      meta: {
        showHeader: true
      }
    },
    /**
     * -保险模块-
     * @InsuranceCenter 保险中心
     * @SocialSubstitute 社会保险代缴
     * @InsuranceMain 保险主页
     * @InsuranceInfo 保险信息
     * @HolderInfo 投保人信息
     * @AddPersonnel 添加人员
     * @InsuranceOrder 投保订单详情
     * @InsurancePayment 投保支付详情
     * @PolicyInterpretation 社保政策解读
     * @PolicyInterpretationInfo 社保政策解读详情
     * @SocialSecurityInfo 社保详情
     * @Calculator 社保计算器
     * @InsuranceSearch 社保查询
     */
    {
      path: "/insurance_center/:type", //保险中心
      name: "InsuranceCenter",
      component: InsuranceCenter
    },
    {
      path: "/social_substitute", //社会保险代缴
      name: "SocialSubstitute",
      component: SocialSubstitute
    },
    {
      path: "/insurance_main", //保险主页
      name: "InsuranceMain",
      component: InsuranceMain
    },
    {
      path: "/insurance_info", //保险信息
      name: "InsuranceInfo",
      component: InsuranceInfo
    },
    {
      path: "/holder_info/:type", //投保人信息
      name: "HolderInfo",
      component: HolderInfo
    },
    {
      path: "/add_personnel", //添加人员
      name: "AddPersonnel",
      component: AddPersonnel
    },
    {
      path: "/insurance_order", //投保订单详情
      name: "InsuranceOrder",
      component: InsuranceOrder
    },
    {
      path: "/insurance_payment", //投保支付详情
      name: "InsurancePayment",
      component: InsurancePayment
    },
    {
      path: "/PolicyInterpretation/", //社保政策解读列表
      name: "PolicyInterpretation",
      component: PolicyInterpretation,
      meta: {
        showHeader: true,
        showFooter: false,
      }
    },
    {
      path: "/PolicyInterpretationInfo/:id", //社保政策解读详情
      name: "PolicyInterpretationInfo",
      component: PolicyInterpretationInfo,
      meta: {
        showHeader: true,
        showFooter: false,
      }
    },
    {
      path: "/SocialSecurityInfo/", //社保详情
      name: "SocialSecurityInfo",
      component: SocialSecurityInfo,
      meta: {
        showHeader: true,
        showFooter: true,
      }
    },
    {
      path: "/Calculator/", //社保计算器
      name: "Calculator",
      component: Calculator,
      meta: {
        showHeader: true,
        showFooter: true,
      }
    },
    {
      path: "/InsuramceSearch", //社保查寻
      name: "InsuranceSearch",
      component: InsuranceSearch,
      meta: {
        showHeader: true
      }
    },
    //order
    {
      path: "/orderList", //订单列表
      name: "orderList",
	  component: orderList,
	  meta: {
        needLogin: true
      }
    },
    {
      path: "/orderListNext", //订单列表下级
      name: "orderListNext",
      component: orderListNext,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/partList", //订单列表
      name: "partList",
      component: partList
    },
    {
      path: "/partListNext", //订单列表下级
      name: "partListNext",
      component: partListNext,
      meta: {
        showHeader: true
      }
    },
    /**
     * --组件-未知-其他--
     * @MapGroup 百度地图
     * @NewMapGroup 高德地图
     * @Detail 未知详情列表
     * @Chat 未知聊天室
     * @ListModel 未知列表模块
     * @RobConfirmModel 未知？？
     * @ListDemo 系统通知列表demo
     * @DownLoad 分享下载app
     */
    {
      path: "/map_group/:type", //百度地图
      name: "MapGroup",
      component: MapGroup,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/new_map_group", //高德地图
      name: "NewMapGroup",
      component: NewMapGroup,
      meta: {
        showHeader: true
      }
    },
    {
      path: "/detail/:pid", //未知详情列表
      name: "Detail",
      component: Detail
    },
    {
      path: "/chat/:pid/:sid", //未知聊天室
      name: "Chat",
      component: Chat,
      children: [ //嵌套子路由
        {
          path: "/listmodel", //未知列表模块
          name: "ListModel",
          component: ListModel
        },
        {
          path: "/robconfirmmodel/:sid", //未知？？
          name: "RobConfirmModel",
          component: RobConfirmModel
        }
      ]
    },
    {
      path: "/list_demo", //系统通知列表demo
      name: "ListDemo",
      component: ListDemo
    },
    {
      path: "/download", //下载app
      name: "DownLoad",
      component: DownLoad,
      meta: {
        showHeader: true,
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  if (to.path === '/register_select/app') return next();
  if (to.path === '/phoneLogin') return next();
  if (to.path === '/back_password') return next();
  if (to.path === '/readingguide/2') return next();
  if (to.path === '/readingguide/11') return next();
  if (to.path === '/vcode') return next();
  if (to.path === '/regPhone/0') return next();
  if (to.path === '/regPhone/1') return next();
  if (to.path === '/vcode/reg') return next();
  if (to.path === '/vcode/login') return next();
  if (to.path === '/vcode/getpass') return next();
  let isLogin = localStorage.getItem('user_info');
  if (to.meta.needLogin) { 
    if (isLogin) { 
      next()
    } else {
      setTimeout(()=>{
        next({
          path: '/login'
        })
      },1)
    }
  } else {
    next()
  }
});

export default router;
