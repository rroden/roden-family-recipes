class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  # TODO: Commented this out because it was causing the responsive view in chrome to break.
  # allow_browser versions: :modern
end
