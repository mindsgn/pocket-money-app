module Fastlane
  module Helper
    class IncrementVersionNameHelper
      # class methods that you define here become available in your action
      # as `Helper::IncrementVersionNameHelper.your_method`
      #
      def self.show_message
        UI.message("Hello from the increment_version_name plugin helper!")
      end
    end
  end
end
