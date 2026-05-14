import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
          {toasts.map(({ id, testId, title, description, action, ...props }) => (
        <Toast key={id} data-testid={testId ?? `toast-${id}`} {...props}>
          <div className="grid gap-1">
            {title && (
              <ToastTitle data-testid={testId ? `${testId}-title` : `toast-title-${id}`}>
                {title}
              </ToastTitle>
            )}
            {description && (
              <ToastDescription data-testid={testId ? `${testId}` : `toast-description-${id}`}>
                {description}
              </ToastDescription>
            )}
          </div>
          {action}
          <ToastClose data-testid={testId ? `${testId}-close-button` : `toast-close-${id}`} />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
