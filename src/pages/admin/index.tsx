import { type MyPage } from "@/components/layouts/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";

const AdminIndex: MyPage = () => {
  const createCompany = api.admin.generateCompanyJwt.useMutation({
    onSuccess: () => {
      toast({
        variant: "done",
        title: "Başarılı!",
        description: "JWT oluşturuldu.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Bir hata oluştu!",
        description: error.message,
      });
    },
  });

  const createToken = () => {
    void createCompany.mutate();
    toast({
      title: "JWT Oluşturuldu!",
    });
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-16 rounded-lg border-2 border-dashed border-slate-200 p-4">
        {createCompany.data?.token && (
          <div className="mb-4 overflow-x-scroll rounded-md bg-slate-800 p-4 dark:bg-slate-900">
            <code
              className="cursor-pointer text-white"
              onClick={() =>
                void copyToClipboard(
                  `https://elevatox.com/firma/kayit?id=${createCompany.data.token}`,
                )
              }
            >
              {`https://elevatox.com/firma/kayit?id=${createCompany.data.token}`}
            </code>
          </div>
        )}
        <Button type="submit" onClick={() => void createToken()}>
          Token Oluştur
        </Button>
      </div>
    </div>
  );
};

async function copyToClipboard(link: string) {
  await navigator.clipboard.writeText(link);
  toast({
    title: "Link Kopyalandı!",
    duration: 1500,
    description: (
      <pre className="mt-2 w-[340px] overflow-x-auto rounded-md bg-slate-950 p-4">
        <code className="text-white">{link}</code>
      </pre>
    ),
  });
}

export default AdminIndex;
AdminIndex.Layout = "Admin";
