/*
 * =====================================================================================
 * DISCLAIMER:
 * =====================================================================================
 * This localization file is a community contribution and is not officially maintained
 * by Clerk. It has been provided by the community and may not be fully aligned
 * with the current or future states of the main application. Clerk does not guarantee
 * the accuracy, completeness, or timeliness of the translations in this file.
 * Use of this file is at your own risk and discretion.
 * =====================================================================================
 */

import type { LocalizationResource } from "@clerk/types";

export const trTR: LocalizationResource = {
  locale: "tr-TR",
  backButton: "Geri",
  badge__default: "Varsayılan",
  badge__otherImpersonatorDevice: "Diğer taklitçi cihaz",
  badge__primary: "Birincil",
  badge__requiresAction: "Eylem gerekli",
  badge__thisDevice: "Bu cihaz",
  badge__unverified: "Doğrulanmamış",
  badge__userDevice: "Kullanıcı cihazı",
  badge__you: "Siz",
  createOrganization: {
    formButtonSubmit: "Oluştur",
    invitePage: {
      formButtonReset: "Atla",
    },
    title: "Organizasyon oluştur",
  },
  dates: {
    lastDay: "Dün saat {{ date | timeString('tr-TR') }}",
    next6Days:
      "{{ date | weekday('tr-TR','long') }} saat {{ date | timeString('tr-TR') }}",
    nextDay: "Yarın saat {{ date | timeString('tr-TR') }}",
    numeric: "{{ date | numeric('tr-TR') }}",
    previous6Days:
      "Geçen hafta {{ date | weekday('tr-TR','long') }} saat {{ date | timeString('tr-TR') }}",
    sameDay: "Bugün saat {{ date | timeString('tr-TR') }}",
  },
  dividerText: "veya",
  footerActionLink__useAnotherMethod: "Başka bir yöntem kullan",
  footerPageLink__help: "Yardım",
  footerPageLink__privacy: "Gizlilik",
  footerPageLink__terms: "Şartlar",
  formButtonPrimary: "İleri",
  formButtonPrimary__verify: "Verify",
  formFieldAction__forgotPassword: "Şifremi unuttum",
  formFieldError__matchingPasswords: "Şifreler eşleşiyor.",
  formFieldError__notMatchingPasswords: "Şifreler eşleşmiyor.",
  formFieldError__verificationLinkExpired:
    "Doğrulama bağlantısının süresi doldu. Lütfen yeni bir bağlantı isteyin.",
  formFieldHintText__optional: "İsteğe bağlı",
  formFieldHintText__slug:
    "A slug is a human-readable ID that must be unique. It’s often used in URLs.",
  formFieldInputPlaceholder__backupCode: "",
  formFieldInputPlaceholder__confirmDeletionUserAccount: "Hesabı sil",
  formFieldInputPlaceholder__emailAddress: "",
  formFieldInputPlaceholder__emailAddress_username: "",
  formFieldInputPlaceholder__emailAddresses:
    "ornek@email.com, ornek2@email.com",
  formFieldInputPlaceholder__firstName: "",
  formFieldInputPlaceholder__lastName: "",
  formFieldInputPlaceholder__organizationDomain: "",
  formFieldInputPlaceholder__organizationDomainEmailAddress: "",
  formFieldInputPlaceholder__organizationName: "",
  formFieldInputPlaceholder__organizationSlug: "",
  formFieldInputPlaceholder__password: "",
  formFieldInputPlaceholder__phoneNumber: "",
  formFieldInputPlaceholder__username: "",
  formFieldLabel__automaticInvitations:
    "Bu alan adı için otomatik davetleri etkinleştir",
  formFieldLabel__backupCode: "Yedekleme kodu",
  formFieldLabel__confirmDeletion: "Onayla",
  formFieldLabel__confirmPassword: "Şifreyi onayla",
  formFieldLabel__currentPassword: "Mevcut şifre",
  formFieldLabel__emailAddress: "E-posta adresi",
  formFieldLabel__emailAddress_username: "E-posta adresi veya kullanıcı adı",
  formFieldLabel__emailAddresses: "E-posta adresleri",
  formFieldLabel__firstName: "Ad",
  formFieldLabel__lastName: "Soyad",
  formFieldLabel__newPassword: "Yeni şifre",
  formFieldLabel__organizationDomain: "Alan adı",
  formFieldLabel__organizationDomainDeletePending:
    "Bekleyen davetiyeleri ve önerileri sil",
  formFieldLabel__organizationDomainEmailAddress: "Doğrulama e-posta adresi",
  formFieldLabel__organizationDomainEmailAddressDescription:
    "Bu alan adı altında bir e-posta adresi girin, bir doğrulama kodu alın ve bu alan adını doğrulayın.",
  formFieldLabel__organizationName: "Organizasyon adı",
  formFieldLabel__organizationSlug: "Organizasyon bağlantı metni",
  formFieldLabel__passkeyName: "Geçiş anahtarının adı",
  formFieldLabel__password: "Şifre",
  formFieldLabel__phoneNumber: "Telefon numarası",
  formFieldLabel__role: "Rol",
  formFieldLabel__signOutOfOtherSessions: "Diğer cihazlardaki oturumlardan çık",
  formFieldLabel__username: "Kullanıcı adı",
  impersonationFab: {
    action__signOut: "Çıkış yap",
    title: "{{identifier}} olarak giriş yapıldı",
  },
  maintenanceMode:
    "Şu anda bakımdayız, ancak endişelenmeyin, birkaç dakikadan fazla sürmeyecektir.",
  membershipRole__admin: "Yönetici",
  membershipRole__basicMember: "Üye",
  membershipRole__guestMember: "Misafir",
  organizationList: {
    action__createOrganization: "Organizasyon oluştur",
    action__invitationAccept: "Katıl",
    action__suggestionsAccept: "Katılmak için talepte bulun",
    createOrganization: "Organizasyon Oluştur",
    invitationAcceptedLabel: "Katılım başarılı",
    subtitle: "to continue to {{applicationName}}",
    suggestionsAcceptedLabel: "Onay bekliyor",
    title: "Bir hesap seçin",
    titleWithoutPersonal: "Bir organizasyon seçin",
  },
  organizationProfile: {
    badge__automaticInvitation: "Otomatik davetler",
    badge__automaticSuggestion: "Otomatik öneriler",
    badge__manualInvitation: "Otomatik kayıt yok",
    badge__unverified: "Doğrulanmamış",
    createDomainPage: {
      subtitle:
        "Doğrulamak için alan adı ekleyin. Bu alan adında e-posta adresleri olan kullanıcılar organizasyona otomatik olarak katılabilir veya katılma talebinde bulunabilir.",
      title: "Alan adı ekle",
    },
    invitePage: {
      detailsTitle__inviteFailed:
        "Davetiyeler gönderilemedi. Aşağıdaki e-posta adresleri için zaten bekleyen davetler var: {{email_addresses}}.",
      formButtonPrimary__continue: "Davetiye gönder",
      selectDropdown__role: "Rol seçin",
      subtitle:
        "Boşluk veya virgülle ayırarak bir veya daha fazla e-posta adresi girin veya yapıştırın.",
      successMessage: "Davetler başarıyla gönderildi",
      title: "Yeni üyeler davet edin",
    },
    membersPage: {
      action__invite: "Davet et",
      activeMembersTab: {
        menuAction__remove: "Üyeyi kaldır",
        tableHeader__actions: "",
        tableHeader__joined: "Katılma tarihi",
        tableHeader__role: "Rolü",
        tableHeader__user: "Kullanıcı",
      },
      detailsTitle__emptyRow: "Görüntülenecek üye yok",
      invitationsTab: {
        autoInvitations: {
          headerSubtitle:
            "Alan adı uzantılı bir e-posta adresini organizasyonunuzla ilişkilendirerek kullanıcıları davet edin. Bu alan adı uzantısına sahip bir e-posta ile kaydolan herkes, herhangi bir zamanda organizasyona katılabilir.",
          headerTitle: "Otomatik davetler",
          primaryButton: "Doğrulanmış alan adlarını yönetme",
        },
        table__emptyRow: "Gösterilecek davetiye yok",
      },
      invitedMembersTab: {
        menuAction__revoke: "Daveti iptal et",
        tableHeader__invited: "Davet Edilenler",
      },
      requestsTab: {
        autoSuggestions: {
          headerSubtitle:
            "Eşleşen alan adı uzantılı bir e-posta ile kaydolan kullanıcılar, organizasyonunuza katılma talebinde bulunmak için bir öneri görebilecekler.",
          headerTitle: "Otomatik öneriler",
          primaryButton: "Doğrulanmış alan adlarını yönetme",
        },
        menuAction__approve: "Onayla",
        menuAction__reject: "Reddet",
        tableHeader__requested: "Erişim isteği talep edildi",
        table__emptyRow: "Görüntülenecek herhangi bir istek yok",
      },
      start: {
        headerTitle__invitations: "Davetler",
        headerTitle__members: "Üyeler",
        headerTitle__requests: "İstekler",
      },
    },
    navbar: {
      description: "Organizasyonunuzu yönetin.",
      general: "Genel",
      members: "Üyeler",
      title: "Organizasyon",
    },
    profilePage: {
      dangerSection: {
        deleteOrganization: {
          actionDescription:
            "Devam etmek için aşağıya “{{organizationName}}” yazın.",
          messageLine1: "Bu organizasyonu silmek istediğinizden emin misiniz?",
          messageLine2: "Bu işlem kalıcıdır ve geri alınamaz.",
          successMessage: "Organizasyonu sildiniz.",
          title: "Organizasyonu sil",
        },
        leaveOrganization: {
          actionDescription:
            "Devam etmek için aşağıya “{{organizationName}}” yazın.",
          messageLine1:
            "Bu organizasyondan ayrılmak istediğinizden emin misiniz? Bu organizasyona ve uygulamalarına erişiminizi kaybedeceksiniz.",
          messageLine2: "Bu işlem kalıcıdır ve geri alınamaz.",
          successMessage: "Organizasyondan ayrıldınız.",
          title: "Organizasyondan ayrıl",
        },
        title: "Tehlike",
      },
      domainSection: {
        menuAction__manage: "Yönet",
        menuAction__remove: "Sil",
        menuAction__verify: "Doğrula",
        primaryButton: "Alan adı ekle",
        subtitle:
          "Kullanıcıların organizasyona otomatik olarak katılmasına veya doğrulanmış bir alan adı uzantılı e-posta ile katılma isteğinde bulunmasına izin verin.",
        title: "Doğrulanmış alan adları",
      },
      successMessage: "Organizasyon güncellendi.",
      title: "Organizasyon profili",
    },
    removeDomainPage: {
      messageLine1: "Alan adı uzantılı e-posta {{domain}} kaldırılacaktır.",
      messageLine2:
        "Kullanıcılar bundan sonra organizasyona otomatik olarak katılamayacaklar.",
      successMessage: "{{domain}} kaldırıldı.",
      title: "Alan adını kaldır",
    },
    start: {
      headerTitle__general: "Genel",
      headerTitle__members: "Üyeler",
      profileSection: {
        primaryButton: "",
        title: "Organizasyon Profili",
        uploadAction__title: "Logo",
      },
    },
    verifiedDomainPage: {
      dangerTab: {
        calloutInfoLabel:
          "Bu alan adını kaldırmak davet edilmiş kullanıcıları etkileyecektir.",
        removeDomainActionLabel__remove: "Alan adını kaldır",
        removeDomainSubtitle:
          "Bu alan adını doğrulanmış alan adlarınızdan kaldırın",
        removeDomainTitle: "Alan adını kaldır",
      },
      enrollmentTab: {
        automaticInvitationOption__description:
          "Kullanıcılar kayıt olduklarında otomatik olarak organizasyona katılmaya davet edilirler ve istedikleri zaman katılabilirler.",
        automaticInvitationOption__label: "Otomatik davetler",
        automaticSuggestionOption__description:
          "Kullanıcılar katılma talebinde bulunmak için bir öneri alırlar, ancak organizasyona katılabilmeleri için bir yönetici tarafından onaylanmaları gerekir.",
        automaticSuggestionOption__label: "Otomatik öneriler",
        calloutInfoLabel:
          "Kayıt türünün değiştirilmesi yalnızca yeni kullanıcıları etkileyecektir.",
        calloutInvitationCountLabel:
          "Kullanıcılara gönderilen ve bekleyen davetler: {{count}}",
        calloutSuggestionCountLabel:
          "Kullanıcılara gönderilen ve bekleyen öneriler: {{count}}",
        manualInvitationOption__description:
          "Kullanıcılar organizasyona sadece manuel olarak davet edilebilir.",
        manualInvitationOption__label: "Otomatik kayıt özelliği mevcut değil",
        subtitle:
          "Bu alan adı altındaki kullanıcıların organizasyona nasıl katılacaklarını seçin.",
      },
      start: {
        headerTitle__danger: "Tehlike",
        headerTitle__enrollment: "Kayıt seçenekleri",
      },
      subtitle:
        "Alan adı {{domain}} şimdi doğrulandı. Devam etmek için kayıt modunu seçin.",
      title: "{{domain}} adlı alan adını güncelle",
    },
    verifyDomainPage: {
      formSubtitle: "E-posta adresinize gönderilen doğrulama kodunu girin",
      formTitle: "Doğrulama kodu",
      resendButton: "Kod almadınız mı? Tekrar gönderin",
      subtitle:
        "Alan adının {{domainName}} e-posta yoluyla doğrulanması gerekiyor.",
      subtitleVerificationCodeScreen:
        "{{emailAddress}} adresine bir doğrulama kodu gönderildi. Devam etmek için kodu giriniz.",
      title: "Alan adını doğrula",
    },
  },
  organizationSwitcher: {
    action__createOrganization: "Organizasyon oluştur",
    action__invitationAccept: "Katıl",
    action__manageOrganization: "Organizasyonu yönet",
    action__suggestionsAccept: "Katılmak için istekte bulun",
    notSelected: "Organizasyon seçilmedi",
    personalWorkspace: "Kişisel Çalışma Alanı",
    suggestionsAcceptedLabel: "Onay bekleniyor",
  },
  paginationButton__next: "İleri",
  paginationButton__previous: "Geri",
  paginationRowText__displaying: "Sayfa bilgisi:",
  paginationRowText__of: "-",
  signIn: {
    accountSwitcher: {
      action__addAccount: "Hesap ekle",
      action__signOutAll: "Mevcut tüm oturumları kapatın",
      subtitle: "Devam etmek istediğiniz hesabı seçin.",
      title: "Bir hesap seçiniz",
    },
    alternativeMethods: {
      actionLink: "Yardım al",
      actionText: "Bunlardan hiçbiri yok mu?",
      blockButton__backupCode: "Yedekleme kodu kullan",
      blockButton__emailCode: "{{identifier}} adresine doğrulama kodu gönder",
      blockButton__emailLink:
        "{{identifier}} adresine doğrulama bağlantısı gönder",
      blockButton__passkey: "Geçiş anahtarınızla oturum açın",
      blockButton__password: "Şifreyle giriş yap",
      blockButton__phoneCode: "{{identifier}} numarasına doğrulama kodu gönder",
      blockButton__totp: "Authenticator uygulaması kullan",
      getHelp: {
        blockButton__emailSupport: "E-posta desteği",
        content:
          "Eğer hesabınıza giriş yapmakta zorluk yaşıyorsanız, hesabınıza erişiminizi sağlayabilmemiz için bize bir e-posta gönderin ve size yardımcı olalım.",
        title: "Yardım al",
      },
      subtitle:
        "Sorunlarla mı karşılaşıyorsunuz? Oturum açmak için bu yöntemlerden birini deneyebilirsiniz.",
      title: "Farklı bir yöntem kullan",
    },
    backupCodeMfa: {
      subtitle: "{{applicationName}} ile devam etmek için",
      title: "Yedekleme kodu girişi",
    },
    emailCode: {
      formTitle: "Doğrulama kodu",
      resendButton: "Kodu tekrar gönder",
      subtitle: "{{applicationName}} ile devam etmek için",
      title: "E-posta kutunuzu kontrol edin",
    },
    emailLink: {
      clientMismatch: {
        subtitle:
          "Devam etmek için, oturum açma işlemini başlattığınız cihaz ve tarayıcıdaki doğrulama bağlantısını açın",
        title: "Doğrulama bağlantısı bu cihaz için geçersiz",
      },
      expired: {
        subtitle: "Devam etmek için en baştaki sekmeye dönün",
        title: "Bu doğruşlama bağlantısının süresi dolmuş",
      },
      failed: {
        subtitle: "Devam etmek için en baştaki sekmeye dönün",
        title: "Bu doğrulama bağlantısı geçersiz",
      },
      formSubtitle:
        "E-posta adresinize gönderdiğimiz doğrulama bağlantısına tıklayın",
      formTitle: "Doğrulama bağlantısı",
      loading: {
        subtitle: "Birazdan yeniden yönlendirileceksiniz",
        title: "Giriş yapılıyor...",
      },
      resendButton: "Tekrar gönder",
      subtitle: "{{applicationName}} ile devam etmek için",
      title: "E-posta kutunuzu kontrol edin",
      unusedTab: {
        title: "Bu sekmeyi kapatabilirsiniz",
      },
      verified: {
        subtitle: "Birazdan yeniden yönlendirileceksiniz",
        title: "Başarıyla giriş yapıldı",
      },
      verifiedSwitchTab: {
        subtitle: "Devam etmek için en baştaki sekmeye dönün",
        subtitleNewTab: "Devam etmek için yeni açılmış sekmeye dönün",
        titleNewTab: "Farklı bir sekmede giriş yapıldı",
      },
    },
    forgotPassword: {
      formTitle: "Şifre sıfırlama kodu",
      resendButton: "Tekrar gönder",
      subtitle: "şifrenizi sıfırlamak için",
      subtitle_email: "İlk olarak, e-posta kimliğinize gönderilen kodu girin",
      subtitle_phone: "İlk olarak, telefonunuza gönderilen kodu girin",
      title: "Şifreyi sıfırla",
    },
    forgotPasswordAlternativeMethods: {
      blockButton__resetPassword: "Şifremi sıfırla",
      label__alternativeMethods: "Veya başka bir yöntem kullanın:",
      title: "Şifremi unuttum",
    },
    noAvailableMethods: {
      message:
        "Hesabınızda giriş yapmak için kullanabileceğiniz bir yöntem bulunmuyor.",
      subtitle: "Bir hata oluştu",
      title: "Giriş yapılamıyor",
    },
    passkey: {
      subtitle:
        "Geçiş anahtarınızı kullanarak siz olduğunuzu onaylayın. Cihazınız parmak izinizi, yüzünüzü veya ekran kilidinizi isteyebilir.",
      title: "Geçiş anahtarınızı kullanın",
    },
    password: {
      actionLink: "Başka bir yöntem kullan",
      subtitle: "{{applicationName}} ile devam etmek için",
      title: "Şifrenizi girin",
    },
    passwordPwned: {
      title: "Şifre ele geçirildi",
    },
    phoneCode: {
      formTitle: "Doğrulama kodu",
      resendButton: "Kod almadınız mı? Tekrar gönderin",
      subtitle: "{{applicationName}} ile devam etmek için",
      title: "Telefonunuza göz atın",
    },
    phoneCodeMfa: {
      formTitle: "Doğrulama kodu",
      resendButton: "Kod almadınız mı? Tekrar gönderin",
      subtitle:
        "Devam etmek için lütfen telefonunuza gönderilen doğrulama kodunu girin",
      title: "Telefonunuza göz atın",
    },
    resetPassword: {
      formButtonPrimary: "Şifremi sıfırla",
      requiredMessage:
        "Güvenlik nedeniyle şifrenizi sıfırlamanız gerekmektedir.",
      successMessage:
        "Şifreniz başarıyla değiştirildi. Oturumunuzu açılıyor, lütfen biraz bekleyin.",
      title: "Şifre sıfırlama",
    },
    resetPasswordMfa: {
      detailsLabel:
        "Şifrenizi sıfırlamadan önce kimliğinizi doğrulamamız gerekiyor.",
    },
    start: {
      actionLink: "Kayıt ol",
      actionLink__use_email: "E-posta kullan",
      actionLink__use_email_username: "E-posta veya kullanıcı adı kullan",
      actionLink__use_passkey: "Bunun yerine geçiş anahtarını kullanın",
      actionLink__use_phone: "Telefon kullan",
      actionLink__use_username: "Kullanıcı adı kullan",
      actionText: "Hesabınız yok mu?",
      subtitle: "{{applicationName}} ile devam etmek için",
      title: "Giriş yap",
    },
    totpMfa: {
      formTitle: "Doğrulama kodu",
      subtitle:
        "Devam etmek için lütfen kimlik doğrulayıcı uygulamanız tarafından oluşturulan doğrulama kodunu girin",
      title: "İki aşamalı doğrulama",
    },
  },
  signInEnterPasswordTitle: "Şifrenizi girin",
  signUp: {
    continue: {
      actionLink: "Giriş yap",
      actionText: "Hesabınız var mı?",
      subtitle: "{{applicationName}} ile devam etmek için",
      title: "Eksik bilgileri tamamlayın",
    },
    emailCode: {
      formSubtitle: "E-posta adresinize gönderdiğimiz doğrulama kodunu giriniz",
      formTitle: "Doğrulama kodu",
      resendButton: "Kodu tekrar gönder",
      subtitle: "{{applicationName}} ile devam etmek için",
      title: "E-posta adresinizi doğrulayın",
    },
    emailLink: {
      clientMismatch: {
        subtitle:
          "Devam etmek için, kayıt işlemini başlattığınız cihazda ve tarayıcıda doğrulama bağlantısını açın",
        title: "Doğrulama bağlantısı bu cihaz için geçersiz",
      },
      formSubtitle:
        "E-posta adresinize gönderdiğimiz doğrulama bağlantısına tıklayın",
      formTitle: "Doğrulama bağlantısı",
      loading: {
        title: "Giriş yapılıyor...",
      },
      resendButton: "Bağlantı almadınız mı? Tekrar gönder",
      subtitle: "{{applicationName}} ile devam etmek için",
      title: "E-posta adresinizi doğrulayın",
      verified: {
        title: "Başarıyla doğrulandı",
      },
      verifiedSwitchTab: {
        subtitle: "Devam etmek için yeni açılmış sekmeye dönün",
        subtitleNewTab: "Devam etmek için önceki sekmeye dönün",
        title: "E-posta adresiniz başarıyla doğrulandı",
      },
    },
    phoneCode: {
      formSubtitle: "Telefon numaranıza gönderdiğimiz doğrulama kodunu giriniz",
      formTitle: "Doğrulama kodu",
      resendButton: "Kodu tekrar gönder",
      subtitle: "{{applicationName}} ile devam etmek için",
      title: "Telefon numaranızı doğrulayın",
    },
    start: {
      actionLink: "Giriş yap",
      actionLink__use_email: "Bunun yerine e-posta kullanın",
      actionLink__use_phone: "Bunun yerine telefon kullanın",
      actionText: "Hesabınız var mı?",
      subtitle: "{{applicationName}} ile devam etmek için",
      title: "Hesap oluştur",
    },
  },
  socialButtonsBlockButton: "{{provider|titleize}} ile giriş yapın",
  socialButtonsBlockButtonManyInView: "{{provider|titleize}}",
  unstable__errors: {
    captcha_invalid:
      "Başarısız güvenlik doğrulamaları nedeniyle kayıt başarısız. Lütfen tekrar denemek için sayfayı yenileyin veya daha fazla yardım için destek ekibine ulaşın.",
    captcha_unavailable:
      "Başarısız bot doğrulaması nedeniyle kayıt başarısız. Lütfen tekrar denemek için sayfayı yenileyin veya daha fazla yardım için destek ekibine ulaşın.",
    form_code_incorrect: "",
    form_identifier_exists: "",
    form_identifier_exists__email_address:
      "Bu e-posta adresi zaten kullanılıyor. Lütfen farklı bir adres deneyin.",
    form_identifier_exists__phone_number:
      "Bu telefon numarası zaten kullanılıyor. Lütfen başka bir numara deneyin.",
    form_identifier_exists__username:
      "Bu kullanıcı adı zaten kullanılıyor. Lütfen farklı bir tane deneyin.",
    form_identifier_not_found: "",
    form_param_format_invalid: "",
    form_param_format_invalid__email_address:
      "E-posta adresi geçerli bir e-posta adresi olmalıdır.",
    form_param_format_invalid__phone_number:
      "Telefon numarası geçerli bir uluslararası formatta olmalıdır",
    form_param_max_length_exceeded__first_name:
      "Adınız 256 karakteri geçmemelidir.",
    form_param_max_length_exceeded__last_name:
      "Soyadınız 256 karakteri geçmemelidir.",
    form_param_max_length_exceeded__name: "Adınız 256 karakteri geçmemelidir.",
    form_param_nil: "",
    form_password_incorrect: "",
    form_password_length_too_short: "",
    form_password_not_strong_enough: "Şifreniz yeterince güçlü değil.",
    form_password_pwned:
      "Bu şifre bir veri saldırısında ele geçirildiği için kullanılamaz. Lütfen başka bir şifre deneyin.",
    form_password_pwned__sign_in:
      "Bu şifre bir ihlalin parçası olarak bulundu ve kullanılamaz, lütfen şifrenizi sıfırlayın.",
    form_password_size_in_bytes_exceeded:
      "Şifrenize ayrılan depolama alanını aştınız. Lütfen daha kısa bir şifre deneyin.",
    form_password_validation_failed: "Geçersiz şifre",
    form_username_invalid_character: "",
    form_username_invalid_length: "",
    identification_deletion_failed: "Son kimlik bilgilerinizi silemezsiniz.",
    not_allowed_access: "",
    passkey_already_exists: "Bu cihaza zaten bir geçiş anahtarı kaydedilmiş.",
    passkey_not_supported: "Geçiş anahtarları bu cihazda desteklenmiyor.",
    passkey_pa_not_supported:
      "Kayıt için bir platform doğrulayıcısı gerekiyor ancak cihaz bunu desteklemiyor.",
    passkey_registration_cancelled:
      "Geçiş anahtarı kaydı iptal edildi veya süresi doldu.",
    passkey_retrieval_cancelled:
      "Geçiş anahtarı doğrulaması iptal edildi veya süresi doldu.",
    passwordComplexity: {
      maximumLength: "{{length}} karakterden kısa olmalı",
      minimumLength: "{{length}} veya daha fazla karakter içermeli",
      requireLowercase: "bir küçük harf içermeli",
      requireNumbers: "bir sayı içermeli",
      requireSpecialCharacter: "bir özel karakter içermeli",
      requireUppercase: "bir büyük harf içermeli",
      sentencePrefix: "Şifreniz;",
    },
    phone_number_exists:
      "Bu telefon numarası zaten kullanılıyor. Lütfen başka bir numara deneyin.",
    zxcvbn: {
      couldBeStronger:
        "Şifreniz kriterleri sağlıyor, birkaç karakter daha eklerseniz daha güçlü olacaktır.",
      goodPassword: "Harika! Parolanız gerekli tüm gereksinimleri karşılıyor.",
      notEnough: "Şifreniz yeterince güçlü değil.",
      suggestions: {
        allUppercase:
          "Tüm harfleri büyük yazmak yerine rastgele büyük harfler kullanın.",
        anotherWord: "Şifreniz nadir görülen sözcüklerden daha fazla içersin.",
        associatedYears: "Kendinizle alakası olan yılları kullanmayın.",
        capitalization:
          "Sadece ilk harfi büyük yazmak yerine rastgele büyük harfler kullanın.",
        dates: "Kendinizle alakası olan tarihleri kullanmayın.",
        l33t: '"a" yerine "@" kullanmak gibi tahmin edilebilir harf ikamelerinden kaçının.',
        longerKeyboardPattern:
          "Elinizin yönünü birden çok değiştirerek yazdığınız uzun klavye desenleri kullanın.",
        noNeed:
          "Özel karakter, sayı veya büyük harf kullanmadan da güçlü bir şifre oluşturabilirsiniz.",
        pwned:
          "Bu şifreyi başka bir yerde kullanıyorsanız, değiştirseniz iyi olur.",
        recentYears: "Günümüze yakın yılları kullanmayın.",
        repeated: "Kelime veya karakterleri tekrarlamayın.",
        reverseWords: "Yaygın kelimelerin tersini kullanmaktan kaçının.",
        sequences: "Yaygın desenleri kullanmayın.",
        useWords: "Birden çok sözcük kullanın ama yaygın deyişlerden kaçının.",
      },
      warnings: {
        common: "Bu yaygın bir şifre.",
        commonNames: "Yaygın adlar ve soyadlar kolay tahmin edilir.",
        dates: "Tarihleri tahmin etmek kolaydır.",
        extendedRepeat:
          '"abcabcabc" gibi tekrarlanan desenler kolay tahmin edilir.',
        keyPattern: "Kısa klavye desenleri kolay tahmin edilir.",
        namesByThemselves: "Adlar ya da soyadlar kolay tahmin edilir.",
        pwned: "Bu şifre bir veri saldırısında ele geçirilmiş.",
        recentYears: "Yakın yıllar kolay tahmin edilir.",
        sequences: '"abc" gibi yaygın desenlerin tahmini kolaydır.',
        similarToCommon: "Bu yaygın kullanılan şifrelere çok benziyor.",
        simpleRepeat: "Tekrarlanan karakterler kolay tahmin edilir.",
        straightRow: "Klavyede ardışık karakterler kolay tahmin edilir.",
        topHundred: "Bu çok yaygın bir şifre.",
        topTen: "Bu epey yaygın bir şifre.",
        userInputs: "Şifreniz kişisel bilgiler içermemeli.",
        wordByItself: "Tek sözcükler kolay tahmin edilir.",
      },
    },
  },
  userButton: {
    action__addAccount: "Hesap ekle",
    action__manageAccount: "Hesabı yönet",
    action__signOut: "Çıkış yap",
    action__signOutAll: "Tüm hesaplardan çıkış yap",
  },
  userProfile: {
    backupCodePage: {
      actionLabel__copied: "Kopyalandı!",
      actionLabel__copy: "Hepsini kopayala",
      actionLabel__download: ".txt olarak indir",
      actionLabel__print: "Yazdır",
      infoText1: "Yedekleme kodları bu hesap için etkinleştirilecektir.",
      infoText2:
        "Yedekleme kodlarınızı güvenli bir yerde saklayın. Eğer bu kodlarınızın başkasının eline geçtiğini düşünürseniz, yenilerini oluşturabilirsiniz.",
      subtitle__codelist: "Yedekleme kodlarınızı güvenli bir yerde saklayın.",
      successMessage:
        "Yedekleme kodları başarıyla eklendi. Eğer Authenticator uygulamanızın olduğu cihaza erişiminizi kaybettiyseniz, oturum açarken bu kodlardan birini girebilirsiniz. Her kod en fazla bir kez kullanılabilir.",
      successSubtitle:
        "Eğer Authenticator uygulamanızın olduğu cihazınıza erişiminizi kaybederseniz, bu kodlardan birini kullanarak hesabınıza giriş yapabilirsiniz.",
      title: "Yedekleme kodu doğrulaması ekle",
      title__codelist: "Yedekleme kodları",
    },
    connectedAccountPage: {
      formHint: "Yeni bir hesap bağlamak için bir sağlayıcı seçiniz.",
      formHint__noAccounts: "Kullanılabilir bir sağlayıcı yok.",
      removeResource: {
        messageLine1: "{{identifier}} hesabınızdan kaldırılacaktır.",
        messageLine2:
          "Artık bu bağlı hesabı kullanarak oturum açmanız mümkün olmayacaktır ve buna bağlı özellikler çalışmayacaktır.",
        successMessage: "{{connectedAccount}} hesabınızdan kaldırıldı.",
        title: "Bağlı hesabı kaldır",
      },
      socialButtonsBlockButton: "{{provider|titleize}} hesabı bağla",
      successMessage: "Sağlayıcı hesabınıza bağlandı.",
      title: "Hesap bağla",
    },
    deletePage: {
      actionDescription: "Devam etmek için aşağıya “Hesabı sil” yazın.",
      confirm: "Hesabı sil",
      messageLine1: "Hesabınızı silmek istediğinizden emin misiniz?",
      messageLine2: "Bu işlem kalıcıdır ve geri alınamaz.",
      title: "Hesabı sil",
    },
    emailAddressPage: {
      emailCode: {
        formHint:
          "Doğrulama kodunu içeren bir e-posta belirttiğiniz adrese gönderilecektir.",
        formSubtitle:
          "{{identifier}} adresine gönderilen doğrulama kodunu giriniz",
        formTitle: "Doğrulama kodu",
        resendButton: "Yeniden gönder",
        successMessage: "{{identifier}} adresi hesabınıza eklendi.",
      },
      emailLink: {
        formHint:
          "Doğrulama bağlantısını içeren bir e-posta belirttiğiniz adrese gönderilecektir.",
        formSubtitle:
          "{{identifier}} adresine gönderilen doğrulama bağlantısını tıklayınız",
        formTitle: "Doğrulama bağlantısı",
        resendButton: "Yeniden gönder",
        successMessage: "{{identifier}} adresi hesabınıza eklendi.",
      },
      removeResource: {
        messageLine1: "{{identifier}} adresi hesabınızdan kaldırılacaktır.",
        messageLine2:
          "Artık bu e-posta adresini kullanarak oturum açmanız mümkün olmayacaktır.",
        successMessage: "{{emailAddress}} adresi hesabınızdan kaldırıldı.",
        title: "E-posta adresini kaldır",
      },
      title: "E-posta adresi ekle",
      verifyTitle: "E-posta adresini doğrulayın",
    },
    formButtonPrimary__add: "Ekle",
    formButtonPrimary__continue: "İlerle",
    formButtonPrimary__finish: "Bitir",
    formButtonPrimary__remove: "Kaldır",
    formButtonPrimary__save: "Kaydet",
    formButtonReset: "İptal",
    mfaPage: {
      formHint: "Eklemek için bir yöntem seçiniz.",
      title: "İki aşamalı doğrulama yöntemi ekle",
    },
    mfaPhoneCodePage: {
      backButton: "Mevcut numarayı kullan",
      primaryButton__addPhoneNumber: "Telefon numarası ekle",
      removeResource: {
        messageLine1:
          "Giriş yaparken artık {{identifier}} numarasına SMS kodu gönderilmeyecektir.",
        messageLine2:
          "Hesabınızın güvenliği azalabilir. Devam etmek istediğinizden emin misiniz?",
        successMessage:
          "İki aşamalı SMS kodu doğrulaması {{mfaPhoneCode}} numarasından kaldırıldı.",
        title: "İki aşamalı doğrulamayı kaldır",
      },
      subtitle__availablePhoneNumbers:
        "İki aşamalı SMS kodu doğrulaması için bir telefon numarası seçin.",
      subtitle__unavailablePhoneNumbers:
        "İki aşamalı SMS kodu doğrulaması için kullanılabilir bir telefon numarası yok.",
      successMessage1:
        "Oturum açarken, ek bir adım olarak bu telefon numarasına gönderilen bir doğrulama kodunu girmeniz gerekecektir.",
      successMessage2:
        "Bu yedek kodları kaydedin ve güvenli bir yerde saklayın. Kimlik doğrulama cihazınıza erişiminizi kaybederseniz oturum açmak için yedek kodları kullanabilirsiniz.",
      successTitle: "SMS kodu doğrulaması etkin",
      title: "SMS kodu doğrulaması ekle",
    },
    mfaTOTPPage: {
      authenticatorApp: {
        buttonAbleToScan__nonPrimary: "Veya QR kodunu tarat",
        buttonUnableToScan__nonPrimary: "QR kodunu tarayamıyorum",
        infoText__ableToScan:
          "Authenticator uygulamanızda yeni bir giriş yöntemi ayarlayın ve hesabınızla bağlamak için aşağıdaki QR kodunu tarayın.",
        infoText__unableToScan:
          "Authenticator uygulamanızda yeni bir giriş yöntemi ekleme seçeneğini bulun ve aşağıda verilen değeri girin:",
        inputLabel__unableToScan1:
          "Zaman bazlı veya tek seferlik şifrelerin etkinleştirildiğinden emin olun, ardından hesabınızı bağlamayı tamamlayın.",
        inputLabel__unableToScan2:
          "Alternatif olarak doğrulayıcınız TOTP URI’leri destekliyorsa, tam URI’yi de kopyalayabilirsiniz.",
      },
      removeResource: {
        messageLine1:
          "Artık giriş yaparken authenticator'dan gelecek doğrulama kodları gerekmeyecektir.",
        messageLine2:
          "Hesabınızın güvenliği azalabilir. Devam etmek istediğinizden emin misiniz?",
        successMessage: "İki aşamalı doğrulama yöntemi kaldırıldı.",
        title: "İki aşamalı doğrulamayı kaldır",
      },
      successMessage:
        "İki aşamalı doğrulama yöntemi başarıyla eklendi. Oturum açarken, ek bir adım olarak bu doğrulayıcıdan bir doğrulama kodu girmeniz gerekecektir.",
      title: "Authenticator uygulaması ekle",
      verifySubtitle:
        "Authenticator uygulamanızda oluşturulan doğrulama kodunu giriniz",
      verifyTitle: "Doğrulama kodu",
    },
    mobileButton__menu: "Menü",
    navbar: {
      account: "Profil",
      description: "Hesap bilgilerinizi yönetin.",
      security: "Güvenlik",
      title: "Hesap",
    },
    passkeyScreen: {
      removeResource: {
        messageLine1: "{{name}} bu hesaptan kaldırılacaktır.",
        title: "Geçiş anahtarını kaldır",
      },
      subtitle__rename:
        "Bulmayı kolaylaştırmak için geçiş anahtarı adını değiştirebilirsiniz.",
      title__rename: "Geçiş Anahtarını Yeniden Adlandır",
    },
    passwordPage: {
      checkboxInfoText__signOutOfOtherSessions:
        "Eski şifrenizi kullanmış olabilecek diğer tüm cihazlardan çıkış yapmanız önerilir.",
      readonly:
        "Yalnızca kurumsal bağlantı üzerinden oturum açabildiğiniz için parolanız şu anda düzenlenemez.",
      successMessage__set: "Şifreniz başarıyla değiştirildi.",
      successMessage__signOutOfOtherSessions:
        "Diğer tüm cihazlardaki oturumlarınız sonlandırıldı.",
      successMessage__update: "Şifreniz günceellendi.",
      title__set: "Şifreyi değiştir",
      title__update: "Yeni şifre girin",
    },
    phoneNumberPage: {
      infoText:
        "Belirtilen numaraya doğrulama kodunu içeren bir SMS gönderilecektir.",
      removeResource: {
        messageLine1: "{{identifier}} numarası hesabınızdan kaldırılacaktır.",
        messageLine2:
          "Artık bu telefon numarasını kullanarak oturum açmanız mümkün olmayacaktır.",
        successMessage: "{{phoneNumber}} numarası hesabınızdan kaldırıldı.",
        title: "Telefon numarasını kaldır",
      },
      successMessage: "{{identifier}} numarası hesabınıza eklendi.",
      title: "Telefon numarası ekle",
      verifySubtitle:
        "{{identifier}} adresine gönderilen doğrulama kodunu girin",
      verifyTitle: "Telefon numarasını doğrulayın",
    },
    profilePage: {
      fileDropAreaHint:
        "10 MB'tan küçük boyutta bir JPG, PNG, GIF, veya WEBP dosyası yükle",
      imageFormDestructiveActionSubtitle: "Görseli kaldır",
      imageFormSubtitle: "Görsel yükle",
      imageFormTitle: "Profil görseli",
      readonly:
        "Your profile information has been provided by the enterprise connection and cannot be edited.",
      successMessage: "Profiliniz güncellendi.",
      title: "Profili güncelle",
    },
    start: {
      activeDevicesSection: {
        destructiveAction: "Cihaz oturumunu sonlandır",
        title: "Aktif cihazlar",
      },
      connectedAccountsSection: {
        actionLabel__connectionFailed: "Yeniden dene",
        actionLabel__reauthorize: "Yetkilendir",
        destructiveActionTitle: "Kaldır",
        primaryButton: "Hesap bağla",
        subtitle__disconnected: "Bu hesap bağlantısı kesildi.",
        subtitle__reauthorize:
          "Gerekli kapsamlar güncellendi ve sınırlı işlevsellik yaşayabilirsiniz. Sorunları önlemek için lütfen bu uygulamayı yeniden yetkilendirin",
        title: "Bağlı hesaplar",
      },
      dangerSection: {
        deleteAccountButton: "Hesabı sil",
        title: "Tehlike",
      },
      emailAddressesSection: {
        destructiveAction: "E-posta adresini kaldır",
        detailsAction__nonPrimary: "Birincil e-posta adresi yap",
        detailsAction__primary: "Doğrulamayı tamamla",
        detailsAction__unverified: "Doğrulamayı tamamla",
        primaryButton: "E-posta adresi ekle",
        title: "E-posta adresleri",
      },
      enterpriseAccountsSection: {
        title: "Kurumsal hesaplar",
      },
      headerTitle__account: "Hesap",
      headerTitle__security: "Güvenlik",
      mfaSection: {
        backupCodes: {
          actionLabel__regenerate: "Kodları yenile",
          headerTitle: "Yedekleme kodları",
          subtitle__regenerate:
            "Yeni bir dizi güvenli yedekleme kodu alın. Önceki yedekleme kodları silinecek ve kullanılamayacaktır.",
          title__regenerate: "Yedekleme kodlarını yenile",
        },
        phoneCode: {
          actionLabel__setDefault: "Varsayılan olarak ayarla",
          destructiveActionLabel: "Telefon numarasını kaldır",
        },
        primaryButton: "İki aşamalı doğrulama ekle",
        title: "İki aşamalı doğrulama",
        totp: {
          destructiveActionTitle: "Kaldır",
          headerTitle: "Authenticator uygulaması",
        },
      },
      passkeysSection: {
        menuAction__destructive: "Kaldır",
        menuAction__rename: "Yeniden Adlandır",
        title: "Geçiş Anahtarları",
      },
      passwordSection: {
        primaryButton__setPassword: "Şifreyi güncelle",
        primaryButton__updatePassword: "Şifreyi değiştir",
        title: "Şifre",
      },
      phoneNumbersSection: {
        destructiveAction: "Telefon numarasını kaldır",
        detailsAction__nonPrimary: "Birincil yap",
        detailsAction__primary: "Doğrulamayı tamamla",
        detailsAction__unverified: "Doğrulamayı tamamla",
        primaryButton: "Telefon numarası ekle",
        title: "Telefon numaraları",
      },
      profileSection: {
        primaryButton: "Profili güncelle",
        title: "Profil",
      },
      usernameSection: {
        primaryButton__setUsername: "Kullanıcı adını ayarla",
        primaryButton__updateUsername: "Kullanıcı adını değiştir",
        title: "Kullanıcı adı",
      },
      web3WalletsSection: {
        destructiveAction: "Cüzdanı kaldır",
        primaryButton: "Web3 cüzdanları",
        title: "Web3 cüzdanları",
      },
    },
    usernamePage: {
      successMessage: "Kullanıcı adınız güncellendi.",
      title__set: "Kullanıcı adını güncelle",
      title__update: "Kullanıcı adını güncelle",
    },
    web3WalletPage: {
      removeResource: {
        messageLine1: "{{identifier}} cüzdanı hesabınızdan kaldırılacaktır.",
        messageLine2:
          "Artık bu cüzdanı kullanarak oturum açmanız mümkün olmayacaktır.",
        successMessage: "{{web3Wallet}} cüzdanı hesabınızdan kaldırıldı.",
        title: "Web3 cüzdanını kaldır",
      },
      subtitle__availableWallets:
        "Hesabınıza eklemek için bir web3 cüzdanı seçiniz.",
      subtitle__unavailableWallets: "Kullanılabilir bir web3 cüzdanı yok.",
      successMessage: "Web3 cüzdanınız hesabınıza eklendi.",
      title: "Web3 cüzdanı ekle",
    },
  },
} as const;
