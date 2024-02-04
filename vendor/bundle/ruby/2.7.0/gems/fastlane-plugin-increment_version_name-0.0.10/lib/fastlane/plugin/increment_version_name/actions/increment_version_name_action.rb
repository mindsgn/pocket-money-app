require 'tempfile'
require 'fileutils'

module Fastlane
  module Actions
    class IncrementVersionNameAction < Action
      require 'shellwords'
      
      def self.is_supported?(platform)
        [:android].include?(platform)
      end
      
      def self.run(params)
        
        new_version_name ||= params[:version_name]
        constant_name ||= params[:ext_constant_name]
        gradle_file_path ||= params[:gradle_file_path]
        
        if !File.file?(gradle_file_path)
            UI.message(" -> No file exist at gradle file path: (#{gradle_file_path})!")
            return -1
        end
        
        begin
          foundVersionName = "false"
          temp_file = Tempfile.new('fastlaneIncrementVersionName')
          File.open(gradle_file_path, 'r') do |file|
            file.each_line do |line|
              if line.include? constant_name and foundVersionName=="false"
                versionComponents = line.strip.split(' ')
                current_version = versionComponents[versionComponents.length-1].tr("\"","")
                if params[:version_name]
                  UI.verbose("Your current version (#{current_version}) does not respect the format A.B.C") unless current_version =~ /\d.\d.\d/
                else
                  UI.user_error!("Your current version (#{current_version}) does not respect the format A.B.C") unless current_version =~ /\d+.\d+.\d+/
                  version_array = current_version.split(".").map(&:to_i)
                  case params[:bump_type]
                  when "patch"
                    version_array[2] = version_array[2] + 1
                    new_version_name = version_array.join(".")
                  when "minor"
                    version_array[1] = version_array[1] + 1
                    version_array[2] = version_array[2] = 0
                    new_version_name = version_array.join(".")
                  when "major"
                    version_array[0] = version_array[0] + 1
                    version_array[1] = version_array[1] = 0
                    version_array[1] = version_array[2] = 0
                    new_version_name = version_array.join(".")
                  end
                end
                line.replace line.sub(current_version, new_version_name.to_s)
                foundVersionName = "true"
                temp_file.puts line
              else
                temp_file.puts line
              end
            end
            file.close
          end
          temp_file.rewind
          temp_file.close
          FileUtils.mv(temp_file.path, gradle_file_path)
          temp_file.unlink
        end
        if foundVersionName == "true"
          Actions.lane_context["VERSION_NAME"]=new_version_name
          UI.success("☝️ Version name has been changed to #{new_version_name}")
        else
          UI.user_error!("Unable to find the versionName 😭")
        end
      rescue => ex
        UI.error('Before being able to increment and read the versionName from your build.gradle, you first need to setup your project properly.')
        raise ex
      end

      def self.description
        "Increment the version name of your android project."
      end
      
      def self.details
        [
          "This action will increment the version name.",
          "You first have to set up your Android project, if you haven't done it already."
        ].join("\n")
      end

      def self.author
        "fierysolid"
      end

      def self.available_options
          [
              FastlaneCore::ConfigItem.new(key: :bump_type,
                                           env_name: "INCREMENTVERSIONNAME_BUMP_TYPE",
                                           description: "The type of this version bump. Available: patch, minor, major",
                                           default_value: "patch",
                                           verify_block: proc do |value|
                                             UI.user_error!("Available values are 'patch', 'minor' and 'major'") unless ['patch', 'minor', 'major'].include?(value)
                                           end),
             FastlaneCore::ConfigItem.new(key: :gradle_file_path,
                                     env_name: "INCREMENTVERSIONNAME_GRADLE_FILE_PATH",
                                  description: "The relative path to the gradle file containing the version name parameter (default:app/build.gradle)",
                                     optional: true,
                                         type: String,
                                default_value: nil),
              FastlaneCore::ConfigItem.new(key: :version_name,
                                           env_name: "INCREMENTVERSIONNAME_VERSION_NAME",
                                           description: "Change to a specific version. This will replace the bump type value",
                                           optional: true),
              FastlaneCore::ConfigItem.new(key: :ext_constant_name,
                                      env_name: "INCREMENTVERSIONNAME_EXT_CONSTANT_NAME",
                                   description: "If the version name is set in an ext constant, specify the constant name (optional)",
                                      optional: true,
                                          type: String,
                                 default_value: "versionName")
          ]
      end

      def self.output
        [
          ['VERSION_NAME', 'The new version name of the project']
        ]
      end
      
      def self.return_type
        :string
      end

      def self.return_value
        "The new version number"
      end
      
      def self.category
        :project
      end

    end
  end
end
