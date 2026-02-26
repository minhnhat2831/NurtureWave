import { ToastContainer } from 'react-toastify'
import useLoginForm from '../hook/useLoginForm'
import { FormInput } from '@/components/Form'
import { FormProvider } from 'react-hook-form'
import { Button } from '@/components/common'

export default function LoginPage() {
    const { method, loading, onSubmit } = useLoginForm()

    return (<>
        <ToastContainer />
        <FormProvider {...method}>
        <div className="h-screen flex justify-center items-center bg-[url(/bg.jpg)] bg-cover bg-center">
            <div className="w-90 h-auto rounded-3xl bg-white px-8 py-15">
                <div className="m-auto text-center font-semibold text-2xl">CMS Login</div>
                <form onSubmit={method.handleSubmit(onSubmit)} className="flex flex-col justify-center">
                    <div className="px-2 py-2">
                        <FormInput
                            disabled={loading}
                            type='text'
                            name='username'
                            autoComplete="on"
                            label='Username' />
                    </div>
                    <div className="px-2 py-2">
                        <FormInput
                            disabled={loading}
                            type='password'
                            name='password'
                            autoComplete="on"
                            label='Password' />
                    </div>
                    <div className="flex justify-center mt-5">
                        <Button
                            type="submit"
                            disabled={loading}
                            fullWidth
                            loading={loading}>
                            {loading ? "Login..." : "Login"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
        </FormProvider>
    </>)
}